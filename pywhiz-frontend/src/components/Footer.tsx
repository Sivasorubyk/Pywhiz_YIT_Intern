const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#003366] text-white py-4 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p>© {currentYear} Python Learning. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer

