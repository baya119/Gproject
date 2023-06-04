import ListComponent from "../componets/ListComponent";

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
    <div style={{ marginTop: "10px" }}>
      <center>
        <p style={{ color: "white", fontWeight: "bold", fontSize: "30px" }}>
          Closed
        </p>
      </center>
      <ListComponent items={items} />
    </div>
  );
}
export default Closed;
