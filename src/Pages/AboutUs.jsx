import CrouselSlide from "../Components/CarouselSlide";
import HomeLayout from "../Layouts/HomeLayout";
import AboutImage from '../assets/Images/aboutMainImage.png'
import { CELEBRITYS } from '../Constants/CelebrityData';
function AboutUs() {
    return (
        <HomeLayout>
            <div className="pl-20 pt-20 flex flex-col text-white">
                <div className="flex items-center gap-5 mx-10">
                    <section className="w-1/2 space-y-10">
                        <h2 className="text-5xl text-yellow-500 font-semibold">Affordable and quality education</h2>
                        <p className="text-xl text-grey-200">
                            Our goal is to provide the affordable and quality education to the world.
                            We are providing the platform for the aspiring teachers and students to share
                            their skills, creativity and knowledge to each other to empower and contribute
                            in the growth and wellness of mankind.
                        </p>
                    </section>
                    <div className="w-1/2">
                        <img
                            id="text1"
                            style={{
                                filter: "drop-shadow(0 10px 10px rgb(0,0,0))"
                            }}
                            src={AboutImage}
                            alt="AboutImage"
                            className="drop-shadow-2xl" />
                    </div>
                </div>
                <div className="carousel w-1/2 m-auto my-16">
                    {
                        CELEBRITYS && CELEBRITYS.map((celebrity) => (
                            <CrouselSlide
                                key={celebrity.slideNumber}
                                {...celebrity}
                                totalSlides={CELEBRITYS.length} />
                        ))
                    }
                </div>

            </div>
        </HomeLayout>
    );
}

export default AboutUs;