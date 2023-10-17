'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { IconUser } from "@/assets/Icons"
const links =[
    {
        label: 'Panel de Control',
        route: '/'
    },
    {
        label: 'Cuentas',
        route: '/accounts'
    },
    {
        label: 'Registros',
        route: '/records'
    },
    {
        label: 'Estadísticas',
        route: '/analytics'
    }
]

export function Navbar(){
    const active = 'text-gray-800 font-semibold'
    const noActive = 'text-gray-500'
    const pathname = usePathname()
    return(        
        <header className="border rounden-md p-4 bg-slate-100">
            <nav className="flex justify-between">
                <ul className="flex list-none gap-8">
                    {links.map(({label, route})=>(
                        <li key={route} >
                            <Link href={route} className={`${pathname === route ? active : noActive}`}>
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <IconUser/>
            </nav>

        </header>
    )
}