export default function Footer() {
  return (
    <footer className="footer-main shadow-inset bg-[#28313B]">
      <div className="page-center">
        <div className="ftr-cont text-white flex justify-between items-center">
          <span>© {new Date().getFullYear()} ValueLens</span>{" "}
          <span>Campaign ROI & Business Value Calculators</span>
        </div>
      </div>
    </footer>
  );
}
