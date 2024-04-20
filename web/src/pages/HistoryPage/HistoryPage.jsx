import { Metadata, useMutation } from '@redwoodjs/web'
import { useTheme } from '@mui/material/styles'
import dayjs from 'dayjs';
import { IconButton, Button, Grid, Box, Typography, FormControl, MenuItem, InputLabel, Select, OutlinedInput } from '@mui/material'
import { ArrowDownward, ArrowUpward, Delete } from '@mui/icons-material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { auth0 } from 'src/auth'
import React, { useEffect } from 'react'
import { QUERY as TranslationQuery } from 'src/components/TranslationsCell'
import TranslationsCell from 'src/components/TranslationsCell'
import { languages } from "web/src/pages/SubmissionPage/SubmissionPage"
import { useMediaQuery } from 'react-responsive'

const DELETE_ALL_TRANSLATIONS = gql`
  mutation DeleteAllTranslationsMutation($uid: String!) {
    deleteAllTranslations(uid: $uid) {
      count
    }
  }
`

export const delAll = (deleteTranslations, userId) => {
  deleteTranslations({ variables: { uid: userId } });
}

const HistoryPage = ({ page = 1 }) => {
  const theme = useTheme();
  const [userId, setUserId] = React.useState()
  const [selectedInLanguage, setSelectedInLanguage] = React.useState([]);
  const [selectedOutLanguage, setSelectedOutLanguage] = React.useState([]);
  const [selectedStartDate, setSelectedStartDate] = React.useState();
  const [selectedEndDate, setSelectedEndDate] = React.useState();
  const [sort, setSort] = React.useState(1);
  const [inSort, setInSort] = React.useState(0);
  const [outSort, setOutSort] = React.useState(0);
  const [reload, setReload] = React.useState(false);

  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1000px)'})

  useEffect(()=>{
    auth0.getUser().then(user => {
      if(user){
        setUserId(user.sub);
      }
    })
  },[])

  const [deleteTranslations] = useMutation(DELETE_ALL_TRANSLATIONS, {
    onCompleted: (DeleteCount) => {setReload(true); /*console.log("Translations deleted:", DeleteCount.deleteAllTranslations.count)*/},
    refetchQueries: [{ query: TranslationQuery, variables: { page: Number(page), uid: userId, inLang: selectedInLanguage, outLang: selectedOutLanguage, startDate: isNaN(selectedStartDate) ? "1970-01-01T00:00:01Z" : selectedStartDate, endDate: isNaN(selectedEndDate) ? new Date().getFullYear() + 1 + "-01-01T00:00:01Z" : selectedEndDate, sort: sort, inSort: inSort, outSort: outSort }}],
  })

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

    const handleStartDateChange = (date) => {
      if(date != null){
        // console.log(date);
        setSelectedStartDate(date);
      }
    }

    const handleEndDateChange = (date) => {
      if(date != null){
        // console.log(date);
        setSelectedEndDate(date);
      }
    }

    return (
      <Box sx={{ width: "70%", marginBottom: '10px', marginTop: '10px' }}>
        <Typography data-testid='filter' sx={{ color: theme.palette.text.secondary, fontSize: '24px', fontStyle: 'normal', fontWeight: '500'}}>
          Filter
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <FormControl sx={{ marginTop: '0px', marginRight: '10px', height: '20px', width: 175 }}>
            <InputLabel id="demo-multiple-name-label">Input Language</InputLabel>
            <Select
              labelId="filter-inputLanguage"
              id="filter-inputLanguage"
              data-testid="inputLanguage"
              multiple
              value={selectedInLanguage}
              onChange={handleInputChange}
              input={<OutlinedInput label="Input Language" />}
              inputProps={{
                MenuProps: {
                  MenuListProps: {
                    sx: {
                      backgroundColor: theme.palette.background.default,
                      color: theme.palette.text.secondary
                    }
                  }
                }
              }}
            >
              {languages.map((lang) => (
                <MenuItem
                  key={lang.langCode}
                  value={lang.langCode}
                  data-testid="inOptions"
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
              data-testid="outputLanguage"
              multiple
              value={selectedOutLanguage}
              onChange={handleOutputChange}
              input={<OutlinedInput label="Output Language" />}
              inputProps={{
                MenuProps: {
                  MenuListProps: {
                    sx: {
                      backgroundColor: theme.palette.background.default,
                      color: theme.palette.text.secondary
                    }
                  }
                }
              }}
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

          <br></br>

          <Box data-testid='start' sx={{ width: 150, marginRight: '10px',
            "& .MuiInputBase-input": { color: theme.palette.text.secondary },
          }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                views={['year', 'month', 'day']}
                label="mm/dd/yyyy"
                value={selectedStartDate}
                onChange={(newValue) => handleStartDateChange(newValue)}
                onAccept={(value) => {handleStartDateChange(value)}}
                slotProps={{
                  openPickerButton: {
                    color: 'primary',
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
          <Typography data-testid='to' variant='h2' component='span' alignSelf='flex-start' style={{ marginRight: '10px', color: theme.palette.text.secondary, fontSize: '22px', fontStyle: 'normal', fontWeight: '450', alignSelf: 'center' }}>
            to
          </Typography>
          <Box sx={{ width: 150, "& .MuiInputBase-input": { color: theme.palette.text.secondary } }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                views={['year', 'month', 'day']}
                data-testid='end'
                label="mm/dd/yyyy"
                value={selectedEndDate}
                onChange={(newValue) => handleEndDateChange(newValue)}
                onAccept={(value) => {handleEndDateChange(value)}}
                slotProps={{
                  openPickerButton: {
                    color: 'primary',
                  },
                }}
              />
            </LocalizationProvider>
          </Box>
        </Box>

        <br></br>

        <Typography data-testid='sort' sx={{ color: theme.palette.text.secondary, fontSize: '24px', fontStyle: 'normal', fontWeight: '500'}}>
          Sort
        </Typography>

        <Grid container width="100%" sx={{ display: 'flex', alignItems: 'center', color: theme.palette.text.secondary, fontSize: '16px', fontStyle: 'normal', fontWeight: '300'}} spacing={0}>
          <Grid item sx={{display: 'flex', flexDirection: 'row' }} xs={isDesktopOrLaptop ? 6 : 12}>
            <Button
              onClick={() => {inSort != 0 ? setInSort(inSort + 1) : setInSort(1)}}
              data-testid='inputSort'
            >
                Input Language
                {inSort%3 != 0 ? (inSort%3 == 1 ? <ArrowUpward sx={{ fontSize: 'medium', marginLeft: '5px', marginBottom: '1px' }}/> : <ArrowDownward sx={{ fontSize: 'medium', marginLeft: '5px', marginBottom: '1px'}} />) : null}
            </Button>
            <Button
              onClick={() => {outSort != 0 ? setOutSort(outSort + 1) : setOutSort(1)}}
              data-testid='outputSort'
            >
                Output Language
                {outSort%3 != 0 ? (outSort%3 == 1 ? <ArrowUpward sx={{ fontSize: 'medium', marginLeft: '5px', marginBottom: '1px' }}/> : <ArrowDownward sx={{ fontSize: 'medium', marginLeft: '5px', marginBottom: '1px'}} />) : null}
            </Button>
            <Button
              onClick={() => {sort != 0 ? setSort(sort + 1) : setSort(1)}}
              data-testid='dateSort'
            >
                Translation Date
                {sort%3 != 0 ? (sort%3 == 1 ? <ArrowUpward sx={{ fontSize: 'medium', marginLeft: '5px', marginBottom: '1px' }}/> : <ArrowDownward sx={{ fontSize: 'medium', marginLeft: '5px', marginBottom: '1px'}} />) : null}
            </Button>
          </Grid>
          <Grid item sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', alignContent: 'center' }} xs={isDesktopOrLaptop ? 6 : 12}>
            <Button
              onClick={() => {setSort(1); setSelectedInLanguage([]); setSelectedOutLanguage([]); setSelectedStartDate(undefined); setSelectedEndDate(undefined); setInSort(0); setOutSort(0);}}
              sx={{ marginRight: '15px' }}
              data-testid="resetButton"
              variant="text"
            >
                Reset All Filters/Sorts
            </Button>
            <IconButton
              variant="text"
              data-testid="deleteAllButton"
              onClick={() => {delAll(deleteTranslations, userId)}}
              sx={{
                fontSize: '15px',
                fontWeight: '500',
                borderRadius: "4px",
                textTransform: 'uppercase',
                backgroundColor: '#CC0C0C',
                color: theme.palette.text.primary,
                '&:hover': {
                  backgroundColor: '#CC0C0C',
                  color: theme.palette.text.primary,
                }
              }}
            >
              Delete All History
            </IconButton>
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

        <TranslationsCell page={page} uid={userId} inLang={selectedInLanguage} outLang={selectedOutLanguage} startDate={isNaN(selectedStartDate) ? "1970-01-01T00:00:01Z" : selectedStartDate} endDate={isNaN(selectedEndDate) ? new Date().getFullYear() + 1 + "-01-01T00:00:01Z" : selectedEndDate} sort={sort} inSort={inSort} outSort={outSort}/>
      </Box>
    </>
  )
}

export default HistoryPage