import ListComponent from "../componets/ListComponentOngoing";

const items = [
  {
    id: "1",
    image: "/the_dog.jpg",
    header: "S/W/E/P/R STATE WATER MINE AND ENERGY BUREAU",
    subheader: "Construction of Small Works' Supply ",
    deadline: Date.now(),
  },{
    id: "1",
    image: "/the_dog.jpg",
    header: "S/W/E/P/R STATE WATER MINE AND ENERGY BUREAU",
    subheader: "Construction of Small Works' Supply ",
    deadline: Date.now(),
  },{
    id: "1",
    image: "/the_dog.jpg",
    header: "S/W/E/P/R STATE WATER MINE AND ENERGY BUREAU",
    subheader: "Construction of Small Works' Supply ",
    deadline: Date.now(),
  },{
    id: "1",
    image: "/the_dog.jpg",
    header: "S/W/E/P/R STATE WATER MINE AND ENERGY BUREAU",
    subheader: "Construction of Small Works' Supply ",
    deadline: Date.now(),
  },{
    id: "1",
    image: "/the_dog.jpg",
    header: "S/W/E/P/R STATE WATER MINE AND ENERGY BUREAU",
    subheader: "Construction of Small Works' Supply ",
    deadline: Date.now(),
  },{
    id: "1",
    image: "/the_dog.jpg",
    header: "S/W/E/P/R STATE WATER MINE AND ENERGY BUREAU",
    subheader: "Construction of Small Works' Supply ",
    deadline: Date.now(),
  },{
    id: "1",
    image: "/the_dog.jpg",
    header: "S/W/E/P/R STATE WATER MINE AND ENERGY BUREAU",
    subheader: "Construction of Small Works' Supply ",
    deadline: Date.now(),
  },{
    id: "1",
    image: "/the_dog.jpg",
    header: "S/W/E/P/R STATE WATER MINE AND ENERGY BUREAU",
    subheader: "Construction of Small Works' Supply ",
    deadline: Date.now(),
  },
];

function Ongoing() {
  return (
    <div style={{ marginTop: "30px" }}>
      <center>
      <p style={{ color: "Black", fontWeight: "bold", fontSize: "40px", padding: "20px 0px 0px 0px", }}>
          Ongoing
        </p>
      </center>
      <ListComponent items={items}/>
    </div>
  );
}
export default Ongoing;
