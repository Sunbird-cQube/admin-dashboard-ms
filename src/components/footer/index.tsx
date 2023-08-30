import flag from '@/assets/images/flag.png';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className="bg-white py-2 px-3 fixed bottom-0 w-full text-center font-bold text-indigo-900 flex items-center justify-center">
      <Image src={flag} alt='flag' className='m-2' />
      <p>भारत सरकार | Government of India</p>
    </div>
  );
};

export default Footer;
