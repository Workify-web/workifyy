import FormNav from "../../../Components/FormNav";
import { ProfessionalFormNav } from "../../../Helper/Data";
import { useEffect } from "react";
import Form from "../../../Components/Form";
function Professionalsignup() {
  useEffect(() => {
    document.title = "Sign-up-as-professional | Workifyy";
  }, []);
  return (
    <div>
      <FormNav Formnavigation={ProfessionalFormNav} />
      <Form />
    </div>
  );
}

export default Professionalsignup;
