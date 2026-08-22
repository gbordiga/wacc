import { version } from "../../package.json"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-6 text-center border-t">
      <div className="container mx-auto">
        <p className="text-sm text-muted-foreground">
          <a
            href="https://wacc.less.style"
            className="hover:text-primary transition-colors"
          >
            wacc.less.style
          </a>{" "}
          © {year} • Created by{" "}
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
