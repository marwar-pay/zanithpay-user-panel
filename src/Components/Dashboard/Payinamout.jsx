import { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, AppBar, Toolbar } from '@mui/material';
import ChartComponent from './Chart';
import CountUp from 'react-countup';
import { apiGet } from '../../api/apiMethods';

const Payinout = () => {
  const [totalPayin, setTotalPayin] = useState(0);
  const [totalPayout, setTotalPayout] = useState(0);
  const [totalPayinCharges, setTotalPayinCharges] = useState(0);
  const [totalPayoutCharges, setTotalPayoutCharges] = useState(0);



  const defaultChartData = {
    labels: ['Amount', 'Charges'],
    datasets: [
      {
        label: 'Amount & Charges',
        data: [0, 0],
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const [payinChartData, setPayinChartData] = useState(defaultChartData);
  const [payoutChartData, setPayoutChartData] = useState(defaultChartData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payinResponse = await apiGet(`apiUser/v1/payin/getAllPayInSuccess`);

        const totalPayinAmount = payinResponse.data.data.reduce((total, item) => total + item.amount, 0);
        const totalPayinCharges = payinResponse.data.data.reduce((total, item) => total + item.chargeAmount, 0);

        setTotalPayin(totalPayinAmount);
        setTotalPayinCharges(totalPayinCharges);

        const payinData = {
          labels: ['QR Generate Amount', 'QR Generate Charges'],
          datasets: [
            {
              label: 'Payin Amount & Charges',
              data: [totalPayinAmount, totalPayinCharges],
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
            },
          ],
        };
        setPayinChartData(payinData);

        const payoutResponse = await apiGet(`apiUser/v1/payout/getAllPayOutSuccess`);
        

        const totalPayoutAmount = Array.isArray(payoutResponse?.data?.data)
        ? payoutResponse.data.data.reduce((total, item) => total + item.amount, 0)
        : 0;
      
      const totalPayoutCharges = Array.isArray(payoutResponse?.data?.data)
        ? payoutResponse.data.data.reduce((total, item) => total + item.chargeAmount, 0)
        : 0;

        setTotalPayout(totalPayoutAmount);
        setTotalPayoutCharges(totalPayoutCharges);

        const payoutData = {
          labels: ['Payout Amount', 'Payout Charges'],
          datasets: [
            {
              label: 'Payout Amount & Charges',
              data: [totalPayoutAmount, totalPayoutCharges],
              backgroundColor: 'rgba(192,75,75,0.4)',
              borderColor: 'rgba(192,75,75,1)',
            },
          ],
        };
        setPayoutChartData(payoutData);

      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='headerstyle'>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{borderRadius:'10px',background: 'linear-gradient(45deg, #00000073, #2196f3a3) !important',}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Payment Overview
          </Typography>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} sx={{ padding:0.5,marginTop:'10px' }}>
        {/* Payin Summary */}
        <Grid item xs={12} md={3}>
          <Paper className="clrchnge"  sx={{ 
            padding: 2, 
            borderRadius: 2, 
            boxShadow: 3, 
            textAlign:'center',
            color:'#fff',
            background: 'linear-gradient(to right, #ffbf96, #fe7096) !important', 
              '&:hover': { 
              transform: 'scale(1.03)', 
              transition: 'transform 0.2s ease-in-out' ,
              
            } 
          }}>
            <div className="bg1" >
            <Typography variant="h6">Total QR Generate </Typography>
            <Typography variant="body1"> ₹ <CountUp end={totalPayin} decimals={2} duration={2.5} /></Typography>
            </div>
            </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper className="clrchnge"  sx={{ 
            padding: 2, 
            borderRadius: 2, 
            boxShadow: 3, 
            textAlign:'center',
            color:'#fff',
            // background: 'linear-gradient(to right, #e3f2fd, #bbdefb)', 
            background: 'linear-gradient(to right, #90caf9, #047edf 99%)',

            '&:hover': { 
              transform: 'scale(1.03)', 
              transition: 'transform 0.2s ease-in-out', 
            } 
          }}>
            <div className="bg1">
  <Typography variant="h6">Payin Charges</Typography>
  <Typography variant="body1">
    ₹ <CountUp end={totalPayinCharges} decimals={2} duration={2.5} />
  </Typography>
</div>

          </Paper>
        </Grid> 

        {/* Payout Summary */}
        <Grid item xs={12} md={3}>
          <Paper className="clrchnge"  sx={{ 
            padding: 2, 
            borderRadius: 2, 
            boxShadow: 3, 
            textAlign:'center',
            background: 'linear-gradient(to right, #84d9d2, #07cdae) !important',  color:'#fff',
            '&:hover': { 
              transform: 'scale(1.03)', 
              transition: 'transform 0.2s ease-in-out' ,
              
            } 
          }}>
            <div className="bg1">
            <Typography variant="h6">Total Payout</Typography>
            <Typography variant="body1"> ₹ <CountUp end={totalPayout} decimals={2} duration={2.5} /></Typography>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper className="clrchnge"  sx={{ 
            padding: 2, 
            borderRadius: 2, 
            boxShadow: 3, 
            textAlign:'center', 
            color:'#fff',
            background: 'linear-gradient(to right, #f6e384, #ffd500)', 
            '&:hover': { 
              transform: 'scale(1.03)', 
              transition: 'transform 0.2s ease-in-out',
            } 
          }}>
            <div className="bg1" >
            <Typography variant="h6">Payout Charges</Typography>
            <Typography variant="body1"> ₹ <CountUp end={totalPayoutCharges}  decimals={2} duration={2.5}  /></Typography>
          </div>
          </Paper>
        </Grid>

        {/* Payin Chart */}
        <Grid item xs={12} md={6}>
          <ChartComponent data={payinChartData}  title="QR Generate Amount & Charges" />
        </Grid>

        {/* Payout Chart */}
        <Grid item xs={12} md={6}>
          <ChartComponent data={payoutChartData} title="Payout Amount & Charges" />
        </Grid>
      </Grid>
    </Box>
    </div>
  );
};

export default Payinout;
