import { FaMapPin, FaShield } from "react-icons/fa6";
import { FaSignInAlt } from "react-icons/fa";
import Button from "../../../Components/Button";
import { Link } from "react-router-dom";

function Section() {
  return (
    <div className="mt-28 flex flex-col largeDesktop:flex-row items-center largeDesktop:justify-center gap-10">
      <div>
        <img
          src="/assets/workers-svg.svg"
          className="vecimg xsMobile:mt-6 xsMobile:w-[15rem] miniMobile:w-[20rem] mobile:w-[25rem] miniTablet:w-[20rem]  largeDesktop:w-[30rem] tablet:w-[30rem] miniLaptop:w-[25rem] laptop:w-[35rem]"
          alt=""
        />
      </div>

      <div className="flex flex-col  text-white">
        <h1 className="pb-6 text-3xl px-10 text-center font-bold leading-relaxed  miniTablet:text-2xl miniMobile:text-2xl tablet:text-2xl xsMobile:text-xl">
          Workifyy your work game, it’s easy
        </h1>

        <div className="flex flex-col px-10  gap-8">
          {/* Section 1 */}
          <div className="flex items-start gap-4">
            <FaSignInAlt className="text-3xl text-[#32CD32]" />
            <div>
              <h2 className="text-xl font-bold">Easy Access, Big Results</h2>
              <p className="max-w-sm text-sm text-[#32CD32]">
                Register and browse professionals, explore projects, or even
                book a consultation.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="flex items-start gap-4">
            <FaMapPin className="text-3xl text-[#32CD32]" />
            <div>
              <h2 className="text-xl font-bold">
                Post a job and hire top professionals.
              </h2>
              <p className="max-w-sm text-sm text-[#32CD32]">
                Finding talent doesn’t have to be a chore. Post a job or we can
                search for you!
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="flex items-start gap-4">
            <FaShield className="text-3xl text-[#32CD32]" />
            <div>
              <h2 className="text-xl font-bold">
                Work with the best—without breaking the bank
              </h2>
              <p className="max-w-sm text-sm text-[#32CD32]">
                Workifyy makes it affordable to up your work and take advantage
                of low transaction rates.
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-3 pt-8">
          <Link to="/Signup">
            <Button
              name="Sign In"
              className="rounded border-2 border-[#32CD32] bg-[#32CD32] px-4 py-2.5 text-white duration-300 hover:bg-transparent hover:text-[#32CD32]"
            />
          </Link>

          <Link to="/">
            <Button
              name="Hire A Pro"
              className="rounded border-2 border-[#32CD32] bg-transparent px-4 py-2.5 text-[#32CD32] duration-300 hover:bg-[#32CD32] hover:text-white"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Section;
