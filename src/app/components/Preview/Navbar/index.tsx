import Link from "next/link";
import Button from "../../UI/Button";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Navbar() {
  const handleClick = () => {
    navigator.clipboard.writeText("UR MOM");

    toast.custom((t) => (
      <AnimatePresence>
        {t.visible && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeOut" }}
            className="rounded-xl bg-purple px-6 py-4 text-white shadow"
          >
            Link copied to clipboard.
          </motion.div>
        )}
      </AnimatePresence>
    ));
  };

  return (
    <nav className="flex w-full flex-row gap-4 px-6 py-4">
      <Link href="/" className="w-1/2">
        <Button variant="secondary" className="w-full">
          Back to Editor
        </Button>
      </Link>
      <Button className="w-1/2" onClick={handleClick}>
        Share Link
      </Button>
    </nav>
  );
}
