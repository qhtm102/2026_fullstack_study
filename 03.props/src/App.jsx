
import ContactCard from "./component/ContactCard";
import ContactCard2 from "./component/ContactCard2";
import ContactCardList from "./component/ContactCardList";
import Greeting from "./component/Greeting";

function App() {
  const name = "Kimdokki";
  const age = 62;
  const contacts = [
    { 
      name:"홍길동", 
      email: "hkd@eee.com", 
      phone: "010-9632-8857" 
    },
    { 
      name:"장원영", 
      email: "jwy@eee.com", 
      phone: "010-1234-5678" 
    },
    { 
      name:"박지성", 
      email: "pjs@eee.com", 
      phone: "010-7412-6698" 
    },
  ]
  return (
    <>
      <Greeting name={name} age={age} />
      <hr />

      <ContactCard contact={ { name:"kimhaksal", email:"genosid@ddd.com", phone:"000-0000-0000" } }/>

      <hr />
      <ContactCardList contacts = {contacts} />
      
      <hr />
      <ContactCard2>
        <h2>이름: 울룰루 </h2>
        <h3>이메일: dks323@example.com </h3>
        <h3>전화번호: 010-0101-0101 </h3>
      </ContactCard2>
    </>
  );
}

export default App;