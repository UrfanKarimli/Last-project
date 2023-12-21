import { useState } from 'react'
import Navbar from '../components/NavBar'
import SideNav from '../components/SideNav'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import Button from '@mui/material/Button'
// import { v4 as uuidv4 } from 'uuid';



const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const Addinvoys = () => {

  const [invoice, setInvoice] = useState({
    taxiParkId: Date.now(),
    eInvoiceAmount: 100.50,
    eInvoiceStatus: "not-sent",
    paymentStatus: "not-paid",
    date: "2023-09-29",
    username: "sampleUser",
    serverFeeAmount: 5.00,
    driverBankAccountFeeAmount: 1.50,
    driverCardFeeAmount: 2.00,
    fleetBankAccountFeeAmount: 3.50,
    fleetCardFeeAmount: 2.50,
    additionalFeeAmount: 10.00,
    additionalFeeDescription: "Additional service fee"
  });

  const [invoysStatus, setInvoysStatus] = useState('');
  const [amountStatus, setAmountStatus] = useState('');


  // const dynamicID = uuidv4();

  // console.log("dynamicID: " , dynamicID)


  const handleChangeInvoys = (event) => {
    setInvoysStatus(event.target.value);
  };
  const handleChangeAmount = (event) => {
    setAmountStatus(event.target.value);
  };
  return (
    <>
    <Navbar />
    <Box sx={{ display: "flex" }}>
      <SideNav />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1>E-Invoys</h1>
        <Box>
          <h2>Park üçün E-İnvoys əlavə et</h2>
          <Box sx={{backgroundColor: "#eeeeee", padding: 2}}>
            <h3>Qaimə məlumatları</h3>
            <hr />
            <Box sx={{backgroundColor: "#dedede", padding: 2, borderRadius: 3}}>
              <h4>Sürücülər üzrə xidmət haqqı (AZN)</h4>
              <hr />
              <Stack direction="row" alignItems="center">
                <label htmlFor="">Bank hesabı üzrə (VÖEN-li):</label>
                <TextField label="Məbləği daxil et..." type='number'/>
              </Stack>
              <Stack direction="row" alignItems="center">
                <label htmlFor="">Avtomatik kart üzrə (VÖEN-siz):</label>
                <TextField label="Məbləği daxil et..." type='number'/>
              </Stack>
            </Box>
            <Box sx={{backgroundColor: "#dedede", padding: 2, borderRadius: 3}}>
              <h4>Fleetlər üzrə xidmət haqqı (AZN)</h4>
              <hr />
              <Stack direction="row" alignItems="center">
                <label htmlFor="">Bank hesabı üzrə (VÖEN-li):</label>
                <TextField label="Məbləği daxil et..." type='number'/>
              </Stack>
              <Stack direction="row" alignItems="center">
                <label htmlFor="">Avtomatik kart üzrə (VÖEN-siz):</label>
                <TextField label="Məbləği daxil et..." type='number'/>
              </Stack>
            </Box>
            <Box sx={{backgroundColor: "#dedede", padding: 2, borderRadius: 3}}>
              <h4>Qaimə statusu</h4>
              <hr />
              <Stack direction="row" alignItems="center">
              <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Statusu seçin</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Statusu seçin"
          value={invoysStatus}
          onChange={handleChangeInvoys}
        >
          <MenuItem value={10}>Göndərilməyib</MenuItem>
          <MenuItem value={20}>Göndərilib</MenuItem>
        </Select>
      </FormControl>
    </Box>
              </Stack>
            </Box>
            <Box sx={{backgroundColor: "#dedede", padding: 2, borderRadius: 3}}>
              <h4>Ödəniş statusu</h4>
              <hr />
              <Stack direction="row" alignItems="center">
              <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Statusu seçin</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={amountStatus}
          label="Statusu seçin"
          onChange={handleChangeAmount}
        >
          <MenuItem value={10}>Göndərilməyib</MenuItem>
          <MenuItem value={20}>Göndərilib</MenuItem>
        </Select>
      </FormControl>
    </Box>
              </Stack>
            </Box>
          </Box>
          <Box sx={{backgroundColor: "#eeeeee", padding: 2}}>
            <h3>Taxi Park üzrə məlumatlar</h3>
            <hr />
            <Box sx={{backgroundColor: "#dedede", padding: 2, borderRadius: 3}}>
              <h4>Şirkət məlumatları</h4>
              <hr />
              <Stack direction="row" alignItems="center">
                <label htmlFor="">Hüquqi adı:</label>
                <TextField label="Enter Legal Name..." type='number'/>
              </Stack>
              <Stack direction="row" alignItems="center">
                <label htmlFor="">VÖEN:</label>
                <TextField label="Enter Legal Name..." type='number'/>
              </Stack>
            </Box>
            <Box sx={{backgroundColor: "#dedede", padding: 2, borderRadius: 3}}>
              <h4>Server Xidmət haqqı (AZN)</h4>
              <hr />
              <Stack direction="row" alignItems="center">
                <TextField label="Fix məbləğ daxil edin..." type='number'/>
              </Stack>
            </Box>
            <Box sx={{backgroundColor: "#dedede", padding: 2, borderRadius: 3}}>
              <h4>Əlavə xidmət haqqı</h4>
              <hr />
              <Stack direction="row" alignItems="center">
                <label htmlFor="">Xidmət haqqı (AZN):</label>
                <TextField label="Məbləğ daxil edin..." type='number'/>
              </Stack>
              <Stack direction="row" alignItems="center">
                <label htmlFor="">Təsviri:</label>
                <Textarea aria-label="minimum height" minRows={3} placeholder="Minimum 3 rows" />
              </Stack>
            </Box>
          </Box>
          <Button
            className="buttonTaxi"
            variant="contained"
          >
            Əlavə et
          </Button>
        </Box>
      </Box>
    </Box>
``  </>
  )
}

export default Addinvoys

