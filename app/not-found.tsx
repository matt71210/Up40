import Link from 'next/link'
export default function NotFound(){return <main className="card"><div className="badge">404</div><h2 className="sectionTitle">Page introuvable</h2><p className="muted">La route demandée n’existe pas dans ce MVP Up40.</p><Link href="/" className="btn btn-primary">Retour à l’accueil</Link></main>}
