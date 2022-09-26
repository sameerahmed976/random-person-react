import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaUserAlt,
  FaCalendarAlt,
  FaMapMarkedAlt,
  FaPhoneAlt,
  FaLock,
} from "react-icons/fa";

const url = "https://randomuser.me/api/";
function App() {
  const [loading, setLoading] = useState(false);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random Person");
  const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      const person = data.results[0];

      const { email, phone } = person;

      const { large: image } = person.picture;

      const { age } = person.dob;
      const { country } = person.location;

      const { password } = person.login;

      const { title, first, last } = person.name;

      const newPerson = {
        name: `${title}${first}${last}`,
        email,
        phone,
        age,
        country,
        password,
        image,
      };

      setPerson(newPerson);
      setTitle("name");
      setValue(newPerson.name);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const changeText = (e) => {
    if (e.target.classList.contains("icon")) {
      const newValue = e.target.dataset.id;
      setTitle(newValue);
      setPerson(person[newValue]);
    }
  };

  return (
    <div className="App">
      <section className="card__container">
        <section className="card__image">
          <img src={person?.image || defaultImage} alt="image" />
        </section>
        <section className="card__content">
          <p className="card__title">my {title} is</p>
          <h2 className="card__heading">{value}</h2>
          <section className="card__icon--group">
            <button className="icon" data-id="name" onMouseOver={changeText}>
              <FaUserAlt />
            </button>
            <button className="icon" data-id="age" onMouseOver={changeText}>
              <FaCalendarAlt />
            </button>
            <button className="icon" data-id="phone" onMouseOver={changeText}>
              <FaPhoneAlt />
            </button>
            <button className="icon" data-id="email" onMouseOver={changeText}>
              <FaEnvelope />
            </button>
            <button
              className="icon"
              data-id="location"
              onMouseOver={changeText}
            >
              <FaMapMarkedAlt />
            </button>
            <button
              className="icon"
              data-id="password"
              onMouseOver={changeText}
            >
              <FaLock />
            </button>
          </section>
        </section>
      </section>
    </div>
  );
}

export default App;
