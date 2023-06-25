import Image from '@node_modules/next/image';
import loader from '@public/assets/icons/loader.svg';

export default function Loader() {
  return (
    <div className="w-full flex-center">
      <Image
        src={loader}
        width={50}
        height={50}
        alt="loader"
        className="object-contain"
      />
    </div>
  );
}
