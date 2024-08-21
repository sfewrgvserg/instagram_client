import Image from "next/image";
import Link from "next/link";

import { IoHome } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";

import styles from "@/public/css/style.module.css";

const Aside = () => {
  return (
    <aside className=" border-r-[1px] w-[15rem] border-stone-900 h-screen">
      <div>
        <Link href="/">
          <Image
            className="py-2"
            src="/image/icon/logo.png"
            alt="logo instagram"
            width={150}
            height={50}
          />
        </Link>
      </div>

      <div>
        <ul className="flex flex-col justify-between h-[90vh] pl-5">
          <div className="space-y-1 pt-5 pr-3 text-sm">
            <li>
              <Link href="/" className={`${styles.components_aside_icons}`}>
                <IoHome size={20} /> <p>Home</p>
              </Link>
            </li>

            <li>
              <Link href="/" className={`${styles.components_aside_icons}`}>
                <IoMdSearch size={20} /> <p>Search</p>
              </Link>
            </li>

            <li>
              <Link href="/" className={`${styles.components_aside_icons}`}>
                <CiHeart size={20} /> <p>Notifications</p>
              </Link>
            </li>

            <li>
              <Link href="/" className={`${styles.components_aside_icons}`}>
                <CiSquarePlus size={20} /> <p>Create</p>
              </Link>
            </li>

            <li>
              <Link href="/" className={`${styles.components_aside_icons}`}>
                <Image
                  alt="logo user"
                  className="rounded-full w-10 h-10"
                  width={100}
                  height={100}
                  src="/image/icon/img3.png"
                />
                <p>Profile</p>
              </Link>
            </li>
          </div>

          <li className="pr-3">
            <Link href="/" className={`${styles.components_aside_icons}`}>
              <CiLogout /> <p>Logout</p>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
