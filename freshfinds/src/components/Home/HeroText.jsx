const HeroText = () => {
    return (
      <>
        <h1 className="text-xs sm:text-sm md:text-lg lg:text-4xl xl:text-5xl font-semibold text-gray-800 mb-4" style={{
            fontFamily: 'General Sans, sans-serif'
        }}>Ecological Produce</h1>
        <div className="text-xs sm:text-sm md:text-lg lg:text-2xl xl:text-3xl font-thin text-gray-500 p-1 mb-6" style={{
            fontFamily: 'Satoshi, sans-serif'
        }}>
          <h1>Imagine a Farmers Market,<br /> accessible from your home.</h1>
          <h2 className="mt-6">Order Meat, Fruit, and Veggies<br />directly from local growers.</h2>
          <h2 className="mt-6">Fresh, local, no hassle.</h2>
        </div>
      </>
    );
  };
  
  export default HeroText;