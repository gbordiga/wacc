import Link from "next/link"
import { version } from "../../package.json"

const footerLinks = [
  { href: "/", label: "WACC Calculator" },
  { href: "/guide", label: "WACC Guide" },
  { href: "/guide/wacc-vs-cost-of-equity", label: "WACC vs Cost of Equity" },
  { href: "/guide/damodaran-wacc", label: "Damodaran WACC" },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t py-6 print:hidden">
      <div className="container mx-auto space-y-3 px-4 text-center">
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          {footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-medium text-muted-foreground hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            wacc.less.style
          </Link>{" "}
          © <span suppressHydrationWarning>{year}</span> • Created by{" "}
          <a
            href="https://github.com/gbordiga/wacc"
            className="font-medium hover:text-primary transition-colors"
          >
            Giacomo Bordiga
          </a>
          {" • "}
          <span>v{version}</span>
        </p>
      </div>
    </footer>
  )
}
