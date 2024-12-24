import Form from "../../../Components/Form";
import FormNav from "../../../Components/FormNav";
import { ClientFormNav } from "../../../Helper/Data";
import { useEffect } from "react";
function Clientsignup() {
  useEffect(() => {
    document.title = "Sign In | Workifyy";
  }, []);
  return (
    <div>
      <FormNav Formnavigation={ClientFormNav} />
      <Form />
    </div>
  );
}

export default Clientsignup;
