import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Overall from '../RegionScoreTabs/Overall';
import Monthly from '../RegionScoreTabs/Monthly';
import MonthComparison from '../RegionScoreTabs/MonthComparison';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 1000 }}
    >
      <Tabs
        className='drop-shadow-xl'
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Overall" {...a11yProps(0)}/>
        <Tab label="Detailed KPI" {...a11yProps(1)} disabled/>
        <Tab label="Months" {...a11yProps(2)} />
        
      </Tabs>
      <TabPanel value={value} index={0}>
        <Overall/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Monthly/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MonthComparison/>
      </TabPanel>
      
    </Box>
  );
}