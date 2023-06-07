import ListComponent from "../componets/ListComponentUpcomming";

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

function Upcoming() {
  return (
    <div style={{ marginTop: "30px" }}>
      <center>
      <p style={{ color: "Black", fontWeight: "bold", fontSize: "40px", padding: "20px 0px 0px 0px", }}>
          Upcoming
        </p>
      </center>
      <ListComponent items={items} createVisible={true} path={"create-bid"} />
    </div>
  );
}
export default Upcoming;
