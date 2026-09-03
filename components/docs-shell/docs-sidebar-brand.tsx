import Image from "next/image";
import KBValburyLogo from "@/public/branding/kb-valbury-logo.png";

export function DocsSidebarBrand() {
  return (
    <div className="flex items-center gap-2.5 shrink-0">
      <Image
        src={KBValburyLogo}
        alt="KB Valbury Securities logo"
        className="w-36"
        priority
      />
    </div>
  );
}
