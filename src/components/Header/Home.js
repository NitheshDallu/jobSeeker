import React, { useState } from 'react';
import {
  Typography,
  InputBase,
  Grid,
  Box,
  IconButton,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import bg1 from '../../Assests/bg4.jpg';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../Header/Footer';

const Home = () => {
  const [jobUpdates, setJobUpdates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle the API call and navigation
  const getapiForJob = async () => {
    if (!searchTerm) {
      toast.warning("Please enter a search term before fetching job data.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get('http://localhost:8081/api/jobs');
      const filteredJobs = response.data.filter((job) =>
        job.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filteredJobs.length > 0) {
        navigate('/jobList', { state: { jobs: filteredJobs } });
      } else {
        toast.info("No jobs found matching your search term.");
      }
    } catch (error) {
      console.error('Error fetching jobs:', error.message || error);
      toast.error(`Error fetching jobs: ${error.message || error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `url(${bg1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: 'black',
            fontWeight: 700,
            mb: 1.5,
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          Find the Career You Deserve
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: '30px',
            p: 1,
            width: '80%',
            maxWidth: '600px',
            boxShadow: 2,
          }}
        >
          <InputBase
            placeholder="Search for jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              flex: 1,
              fontSize: '1rem',
              px: 1,
              fontFamily: 'Roboto, sans-serif',
            }}
          />
          <IconButton
            onClick={getapiForJob}
            color="primary"
            sx={{
              borderRadius: '50%',
              ml: 1,
              p: 1,
              minWidth: '40px',
              height: '40px',
            }}
          >
            <SearchIcon />
          </IconButton>
        </Box>
      </div>

      {/* Loader */}
      {loading ? (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4} justifyContent="center" sx={{ py: 4, bgcolor: '#f5f5f5' }}>
          {/* Job Updates Section */}
          <Grid item xs={12}>
            <Typography variant="h4" align="center" sx={{ fontWeight: 600, mb: 2, fontFamily: 'Roboto, sans-serif' }}>
              Daily Updates
            </Typography>
          </Grid>

          {/* Top Companies Section */}
          <Grid item xs={12}>
            <Typography variant="h4" align="center" sx={{ fontWeight: 600, mt: 3, mb: 2, fontFamily: 'Roboto, sans-serif' }}>
              Top Companies Hiring Now
            </Typography>
          </Grid>
        </Grid>
      )}

      <Footer />
    </div>
  );
};

export default Home;
