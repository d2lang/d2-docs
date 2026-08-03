import React from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import { splitNavbarItems } from "@docusaurus/theme-common/internal";

import SearchBar from "@theme/SearchBar";
import NavbarItem from "@theme/NavbarItem";

import "./footer.scss";

function Footer() {
  const navbarItems = useThemeConfig().navbar.items;
  const [links, rightItems] = splitNavbarItems(navbarItems);

  const icons = rightItems.filter((i) => i.type === "custom-iconLink");
  const playground = rightItems.find((i) => i.label === "Playground");
  return (
    <footer className="Footer">
      <div className="Footer--Top">
        <img className="Footer__Logo" src="/img/d2_logo.png" alt="D2 logo" />
        <div className="Footer__Mobile">
          <div className="Footer__Mobile--Icons">
            {icons.map((item, i) => (
              <NavbarItem key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
      <div className="Footer__Right">
        <span className="Footer__Sponsorship">
          D2 is an independent open-source project fiscally sponsored by{" "}
          <a className="Footer__Link" href="https://hackclub.com/fiscal-sponsorship/">
            Hack Club
          </a>
          .
        </span>
        <div className="Footer__Links">
          <a className="Footer__Link" href="https://hcb.hackclub.com/donations/start/d2">
            Donate
          </a>
          <a className="Footer__Link" href="https://github.com/d2lang/d2">
            GitHub
          </a>
          <a className="Footer__Link" href="https://discord.com/invite/pbUXgvmTpU">
            Discord
          </a>
        </div>
      </div>
      <div className="Footer__Mobile">
        <div className="Footer__Mobile--Bar">
          <div className="Footer__Mobile--Bottom">
            <div className="Footer__Mobile--Links">
              {links.map((item, i) => (
                <NavbarItem key={i} {...item} />
              ))}
            </div>
            <NavbarItem {...playground} className="Footer__Mobile--Playground" />
          </div>
        </div>
      </div>
    </footer>
  );
}
export default React.memo(Footer);
