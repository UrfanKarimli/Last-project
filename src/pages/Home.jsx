import Navbar from "../components/NavBar";
import Sidenav from "../components/SideNav";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const Home = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Əsas səhifə</h1>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: 350,
                height: 120,
                borderRadius: 5,
                padding: 1,
                color: "white",
                backgroundColor: "#414141",
                
              },
            }}
            gap={5}
          >
            <Paper elevation={5} >
              <h3 style={{margin: 10}}>Mənfəət <span style={{color: "#13bc13",fontSize: 14, marginLeft: 10}}>+ 2.43%</span></h3>
              <div>
                <p style={{marginLeft: 10}}>Total: <span>$ 240k</span></p>
                
              </div>
            </Paper>
            <Paper elevation={5}>
            <h3 style={{margin: 10}}>Borc <span style={{color: "#ce4242",fontSize: 14, marginLeft: 10}}>+ 4.21%</span></h3>
            <div>
                <p style={{marginLeft: 10}}>Total: <span>$ 20k</span></p>
              </div>
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
