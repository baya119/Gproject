import ListComponent from "../componets/ListComponentClosed";

const items = [
  {
    id: "1",
    image: "/the_dog.jpg",
    header: "S/W/E/P/R STATE WATER MINE AND ENERGY BUREAU",
    subheader: "Construction of Small Works' Supply ",
    deadline: Date.now(),
  },
  {
    id: "1",
    image: "/the_dog.jpg",
    header: "S/W/E/P/R STATE WATER MINE AND ENERGY BUREAU",
    subheader: "Construction of Small Works' Supply ",
    deadline: Date.now(),
  },
  {
    id: "1",
    image: "/the_dog.jpg",
    header: "S/W/E/P/R STATE WATER MINE AND ENERGY BUREAU",
    subheader: "Construction of Small Works' Supply ",
    deadline: Date.now(),
  },
  {
    id: "1",
    image: "/the_dog.jpg",
    header: "S/W/E/P/R STATE WATER MINE AND ENERGY BUREAU",
    subheader: "Construction of Small Works' Supply ",
    deadline: Date.now(),
  },
  {
    id: "1",
    image: "/the_dog.jpg",
    header: "S/W/E/P/R STATE WATER MINE AND ENERGY BUREAU",
    subheader: "Construction of Small Works' Supply ",
    deadline: Date.now(),
  },
  {
    id: "1",
    image: "/the_dog.jpg",
    header: "S/W/E/P/R STATE WATER MINE AND ENERGY BUREAU",
    subheader: "Construction of Small Works' Supply ",
    deadline: Date.now(),
  },

];

function Closed() {
  return (
    <div style={{ marginTop: "30px" }}>
      <center>
        <p style={{ color: "Black", fontWeight: "bold", fontSize: "40px", padding: "20px 0px 0px 0px", }}>
          Closed
        </p>
      </center>
      <ListComponent items={items} />
    </div>
  );
}
export default Closed;
