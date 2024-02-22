import BestProduct from "./BestProduct.tsx";
import Navbar from "./Navbar.tsx";
import ImageSlider from "./ImagerSlider.tsx";


const Home=()=>{
    const images=[
        'src/assets/logo.jpg',
        'src/assets/slider1.jpg',
        'src/assets/login.jpg',
    ]
    return(

            <div>
                <Navbar isLoggedIn/>
                <ImageSlider images={images}/>
            <BestProduct/>
            </div>
    )
}

export default Home;