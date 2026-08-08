import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// On utilise le client admin pour créer des utilisateurs
function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      email,
      age,
      height,
      weight,
      goal,
      pains,
      level,
    } = body as {
      email: string
      age: string
      height: string
      weight: string
      goal: string
      pains: string[]
      level: string
    }

    if (!email || !age || !height || !weight) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants" },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // 1. Trouver ou créer l'utilisateur
    const { data: existingUsers } = await supabase.auth.admin.listUsers()
    const existingUser = existingUsers?.users.find(u => u.email === email.trim())

    let userId = existingUser?.id

    if (!userId) {
      const { data, error } = await supabase.auth.admin.createUser({
        email: email.trim(),
        email_confirm: true,
      })
      if (error) {
        console.error("Erreur createUser:", error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
      userId = data.user.id
    }

    // 2. Mapper les réponses vers le schÃ©ma profiles
    const hasPain = pains.length > 0 && pains[0] !== "aucune"
    const painAreas = hasPain ? pains.filter(p => p !== "aucune") : []

    // On pourrait mapper 'level' vers current_push_level selon ta logique
    const currentPushLevel = 0 // Ã  adapter selon ta logique mÃ©tier

    // 3. CrÃ©er ou mettre Ã  jour le profil
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .single()

    if (existingProfile) {
      // Mise Ã  jour
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          email: email.trim(),
          age: parseInt(age, 10),
          height_cm: parseInt(height, 10),
          weight_kg: parseFloat(weight),
          fitness_goal: goal,
          has_pain: hasPain,
          pain_areas: painAreas,
          current_push_level: currentPushLevel,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)

      if (updateError) {
        console.error("Erreur update profile:", updateError.message)
        return NextResponse.json({ error: updateError.message }, { status: 500 })
      }
    } else {
      // Insertion
      const { error: insertError } = await supabase.from("profiles").insert({
        id: userId,
        email: email.trim(),
        age: parseInt(age, 10),
        height_cm: parseInt(height, 10),
        weight_kg: parseFloat(weight),
        fitness_goal: goal,
        has_pain: hasPain,
        pain_areas: painAreas,
        current_push_level: currentPushLevel,
      })

      if (insertError) {
        console.error("Erreur insert profile:", insertError.message)
        return NextResponse.json({ error: insertError.message }, { status: 500 })
      }
    }

    // 4. Envoyer le magic link
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || request.headers.get("origin")}/auth/callback`,
      },
    })

    if (otpError) {
      console.error("Erreur signInWithOtp:", otpError.message)
      return NextResponse.json({ error: otpError.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    console.error("Erreur inattendue:", err)
    const message = err instanceof Error ? err.message : "Erreur serveur"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
