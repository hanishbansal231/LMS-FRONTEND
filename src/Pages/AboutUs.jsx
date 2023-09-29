import HomeLayout from "../Layouts/HomeLayout";
import AboutImage from '../assets/Images/aboutMainImage.png'
import apj from '../assets/Images/apj.png'
import billGates from '../assets/Images/billGates.png'
import einstein from '../assets/Images/einstein.png'
import nelsonMandela from '../assets/Images/nelsonMandela.png'
import steveJobs from '../assets/Images/steveJobs.png'
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
                    <div id="slide1" className="carousel-item relative w-full">
                        <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img src={apj} className="w-40 rounded-full border-2 border-gray-400" />
                            <p>
                                {"Failure will never overtake me if my determination to succeed is strong enough."}
                            </p>
                            <h3 className="text-2xl font-semibold">Nelson Mandela</h3>
                            <div className="absolute   flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide5" className="btn btn-circle">❮</a>
                                <a href="#slide2" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                    <div id="slide2" className="carousel-item relative w-full">
                    <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img src={billGates} className="w-40 object-cover rounded-full border-2 border-gray-400" />
                            <p>
                                {"Success is a lousy teacher. It seduces smart people into thinking they can’t lose."}
                            </p>
                            <h3 className="text-2xl font-semibold">Bill Gates</h3>
                            <div className="absolute   flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide1" className="btn btn-circle">❮</a>
                                <a href="#slide3" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                    <div id="slide3" className="carousel-item relative w-full">
                    <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img src={einstein} className="w-40 object-cover rounded-full border-2 border-gray-400" />
                            <p>
                                {"Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world."}
                            </p>
                            <h3 className="text-2xl font-semibold">Einstein</h3>
                            <div className="absolute  flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide2" className="btn btn-circle">❮</a>
                                <a href="#slide4" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                    <div id="slide4" className="carousel-item relative w-full">
                    <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img src={nelsonMandela} className="w-40 object-cover rounded-full border-2 border-gray-400" />
                            <p>
                                {"Education is the most powerfull tool you can use to change the world."}
                            </p>
                            <h3 className="text-2xl font-semibold">Nelson Mandela</h3>
                            <div className="absolute  flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide3" className="btn btn-circle">❮</a>
                                <a href="#slide5" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                    <div id="slide5" className="carousel-item relative w-full">
                    <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
                            <img src={steveJobs} className="w-40 object-cover rounded-full border-2 border-gray-400" />
                            <p>
                                {"Don't let the noise of others' opinions drown out your own inner voice."}
                            </p>
                            <h3 className="text-2xl font-semibold">Steve Jobs</h3>
                            <div className="absolute  flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide4" className="btn btn-circle">❮</a>
                                <a href="#slide1" className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </HomeLayout>
    );
}

export default AboutUs;