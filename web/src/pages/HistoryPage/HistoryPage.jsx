import { Metadata } from '@redwoodjs/web'
import { useTheme } from '@mui/material/styles'
import dayjs from 'dayjs';
import { Button, Grid, Box, Typography, FormControl, MenuItem, InputLabel, Select, OutlinedInput } from '@mui/material'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { auth0 } from 'src/auth'
import { useEffect, useState } from 'react'

import TranslationsCell from 'src/components/TranslationsCell'

export const languages = [
  {dropdownItem: "C++", langCode: "cpp"},
  {dropdownItem: "C#", langCode: "csharp"},
  {dropdownItem: "Java", langCode: "java"},
  {dropdownItem: "JavaScript", langCode: "javascript"},
  {dropdownItem: "Python", langCode: "python"},
  {dropdownItem: "TypeScript", langCode: "typescript"},
];

const HistoryPage = ({ page = 1 }) => {
  const theme = useTheme();
  const [userId, setUserId] = useState()
  const [selectedInLanguage, setSelectedInLanguage] = useState([]);
  const [selectedOutLanguage, setSelectedOutLanguage] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState(dayjs("2025-01-01"));
  const [sort, setSort] = useState(true);

  useEffect(()=>{
    auth0.getUser().then(user => {
      if(user){
        setUserId(user.sub);
      }
    })
  },[])

  const Filters = () => {
    const handleInputChange = (event) => {
      const {
        target: { value },
      } = event;
      setSelectedInLanguage(
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    const handleOutputChange = (event) => {
      const {
        target: { value },
      } = event;
      setSelectedOutLanguage(
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    return (
      <Box sx={{  width: "70%", marginBottom: '10px', marginTop: '10px' }}>
        <Grid container width="100%" spacing={2} alignItems='center' alignContent='center' justifyContent='center'>
          <Grid item alignContent='center' alignItems='stretch' sx={{display: 'flex', justifyContent: 'flex-start' }} xs={9}>
            <Typography data-testid='filter' sx={{ color: theme.palette.text.secondary, fontSize: '22px', fontStyle: 'normal', fontWeight: '450'}}>
              Filter
            </Typography>
          </Grid>
          <Grid item alignContent='center' alignItems='stretch' sx={{display: 'flex', justifyContent: 'flex-start' }} xs={3}>
            <Typography data-testid='sort' sx={{ color: theme.palette.text.secondary, fontSize: '22px', fontStyle: 'normal', fontWeight: '450'}}>
              Sort
            </Typography>
          </Grid>
        </Grid>

        <Grid container width="100%" spacing={2} alignItems='center' alignContent='center' justifyContent='center'>
          <Grid item alignContent='center' alignItems='stretch' sx={{display: 'flex', justifyContent: 'flex-start' }} xs={9}>
            <FormControl sx={{ marginTop: '0px', marginRight: '10px', height: 20, width: 175 }}>
              <InputLabel id="demo-multiple-name-label">Input Language</InputLabel>
              <Select
                labelId="filter-inputLanguage"
                id="filter-inputLanguage"
                multiple
                value={selectedInLanguage}
                onChange={handleInputChange}
                input={<OutlinedInput label="Input Language" />}
              >
                {languages.map((lang) => (
                  <MenuItem
                    key={lang.langCode}
                    value={lang.langCode}
                  >
                    {lang.dropdownItem}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ marginTop: '0px', marginRight: '10px', height: 20, width: 175 }}>
              <InputLabel id="demo-multiple-name-label">Output Language</InputLabel>
              <Select
                labelId="filter-outputLanguage"
                id="filter-outputLanguage"
                multiple
                value={selectedOutLanguage}
                onChange={handleOutputChange}
                input={<OutlinedInput label="Output Language" />}
              >
                {languages.map((lang) => (
                  <MenuItem
                    key={lang.langCode}
                    value={lang.langCode}
                  >
                    {lang.dropdownItem}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ width: 150, marginRight: '10px' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  views={['year', 'month', 'day']}
                  label="mm/dd/yy"
                  value={selectedStartDate}
                  onChange={(newValue) => setSelectedStartDate(newValue)}
                  onAccept={(value) => {setSelectedStartDate(value)}}
                />
              </LocalizationProvider>
            </Box>
            <Typography data-testid='to' variant='h2' component='span' align='flex-start' style={{ marginRight: '10px', color: theme.palette.text.secondary, fontSize: '22px', fontStyle: 'normal', fontWeight: '450', alignSelf: 'center' }}>
              to
            </Typography>
            <Box sx={{ width: 150 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  views={['year', 'month', 'day']}
                  label="mm/dd/yy"
                  value={selectedEndDate}
                  onChange={(newValue) => setSelectedEndDate(newValue)}
                  onAccept={(value) => {
                    setSelectedEndDate(value)
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid item alignContent='center' alignItems='stretch' sx={{display: 'flex', justifyContent: 'flex-start' }} xs={3}>
            <Typography data-testid='sort' sx={{ color: theme.palette.text.secondary, fontSize: '16px', fontStyle: 'normal', fontWeight: '300'}}>
              <Button
                onClick={() => {setSort(!sort)}}
              >
                  Translation Date
                  {sort ? <ArrowUpward sx={{ fontSize: 'medium', marginLeft: '5px' }}/> : <ArrowDownward sx={{ fontSize: 'medium', marginLeft: '5px' }}/>
                  }
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    )
  }

  return (
    <>
      <Metadata title="History" description="History page" />

      <Box minHeight='90vh' width='100%' display="flex" flexDirection='column' alignItems="center">

        <Typography data-testid='title' variant='h2' component='span' align='center' style={{ padding: '15px', width: '65%', borderRadius: '20px' , color: theme.palette.text.secondary, fontSize: '52px', fontStyle: 'normal', fontWeight: '600'}}>
          Translation History
        </Typography>

        <Filters />

        <TranslationsCell page={page} uid={userId} inLang={selectedInLanguage} outLang={selectedOutLanguage} startDate={isNaN(selectedStartDate) ? "1970-01-01T00:00:01Z" : selectedStartDate} endDate={selectedEndDate} sort={sort ? 'desc' : 'asc'}/>
      </Box>
    </>
  )
}

export default HistoryPage