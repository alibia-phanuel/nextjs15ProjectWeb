/* eslint-disable @next/next/no-img-element */
import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Author = {
  _id?: number;
  name?: string; // Utilise `?` pour indiquer une propriété optionnelle
};
export type StartupTypeCard = {
  _createdAt: Date;
  views: number;
  author: Author;
  _id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  // autres propriétés nécessaires...
};

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="sartup_card_date">{formatDate(post._createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-promary" />
          <span className="text-16-medium">{post.views}</span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${post.author?._id}`}>
            <p className="text-16-mediem line-clamp-1">{post.author?.name}</p>
          </Link>
          <Link href={`/startup/${post._id}`}>
            <h3 className="text-26-semibold line-clamp-1">{post.title}</h3>
          </Link>
        </div>
        <Link
          href={`/user/${post.author?._id}`}
          className="rounded-full overflow-hidden"
        >
          <Image
            src={post.author?.image!}
            alt={post.author?.name}
            width={48}
            height={48}
          />
        </Link>
      </div>
      <Link href={`/startup/${post._id}`}>
        <p className="startup-card_desc">{post.description}</p>

        <img src={post.image} alt="placeholder" className="startup-card_img" />
      </Link>
      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${post.category.toLowerCase()}`}>
          <p className="text-16-medium">{post.category}</p>
        </Link>
        <button className="startup-card_btn">
          <Link href={`/startup/${post._id}`}>Details</Link>
        </button>
      </div>
    </li>
  );
};

export default StartupCard;
