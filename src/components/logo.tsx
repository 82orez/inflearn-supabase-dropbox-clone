import Image from "next/image";

export default function Logo() {
  return (
    <header className={"flex items-center gap-2 border-2"}>
      <Image src={"/dropbox_icon.png"} alt={"Mini Drop-box logo"} width={50} height={50} />
      <div className={"text-2xl font-bold"}>Mini Box</div>
    </header>
  );
}
