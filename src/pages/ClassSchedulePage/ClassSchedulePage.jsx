/** @jsxImportSource @emotion/react */
import * as s from "./style";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from "react-query";
import { searchAllSchedule } from "../../apis/api/schedule";
import DailyClassSchedule from "../../components/DailyClassSchedule/DailyClassSchedule";
import { rightSideBarState } from "../../atoms/SideMenuAtom";
import { useRecoilState } from "recoil";
import AddClassSchedule from "../../components/AddClassSchedule/AddClassSchedule";

function ClassSchedulePage() {
  const [ originScheduleDate, setOriginScheduleData ] = useState([]);
  const [ viewScheduleDate, setViewScheduleData ] = useState([]);
  const [ selectDay, setSelectDay ] = useState("");
  const [ dailyScheduleData, setDailyScheduleData ] = useState([]);
  const [ selectTimeOption ] = useState([]);
  const [ isOpenAddSchedule, setIsOpenAddSchedule ] = useState(false);
  const [ isOpenDailySchedule, setIsOpenDailySchedule ] = useState(false);
  // const [ rightSideBar, setRightSideBar ] = useRecoilState(rightSideBarState);

  // useEffect(() => {
  //   setRightSideBar(0)
  // }, [])


  // timeOption 설정 (i = Hour, j = Minute)
  useMemo(() => {
      for(let i = 9; i <= 22; i++) {
          for (let j = 0; j <= 1; j++) {
              let timeSet = {};
              timeSet.value = ('0' + i).slice(-2) + ":" + ('0' + (j * 30)).slice(-2);
              timeSet.label = ('0' + i).slice(-2) + "시 " +  ('0' + (j * 30)).slice(-2) + "분";
              selectTimeOption.push(timeSet);
          };
      };
  }, [])

  // DB에 저장된 ScheduleDate 전체 조회
  const searchAllScheduleQuery = useQuery("searchAllScheduleQuery", searchAllSchedule, 
    {

      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: response => {
        setOriginScheduleData(response.data);
        setViewScheduleData(() => response.data.map(response => {
              return {
                  id: response.classScheduleId,
                  title: response.classScheduleTitle,
                  start: response.classScheduleStartDate,
                  end: response.classScheduleEndDate,
                  color: response.classLocationColor,
                  display: "block"
              }
          }));
      }, 
      onError: error => {
        
      }
    })

    // 캘린더 내에서 날짜 select시 선택한 날짜 데이터 저장
    useEffect(() => {
        setDailyScheduleData(originScheduleDate.filter(originScheduleDate => originScheduleDate.classScheduleStartDate.substring(0, 10) == selectDay))
    }, [selectDay])

    useEffect(() => {
        console.log(dailyScheduleData)
    }, [dailyScheduleData])

    const openAddSchduleModal = () => {
      setIsOpenAddSchedule(!isOpenAddSchedule)
    }

    const openDailsySchduleModal = () => {
      setIsOpenDailySchedule(!isOpenDailySchedule)
    }

    console.log(isOpenDailySchedule)

  return (
    <>
      <div css={s.layout}>
        <div css={s.header}>
          <h1>스케줄 페이지</h1>
          <button css={s.button} onClick={openAddSchduleModal}>일정 추가</button>
        </div>
        <div css={s.calendar}>
          {
            !searchAllScheduleQuery.isLoading 
            ? <FullCalendar
            height={620}
            locale={"ko"}
            initialView="dayGridMonth"
            selectable="true"
            navLinks="true"
            dayMaxEventRows={true}
            plugins={[ dayGridPlugin, interactionPlugin ]}
            events={
              viewScheduleDate
            }
            
            displayEventTime={false}
            eventClick={(date) => {
              console.log(date.event._def.ui.backgroundColor)
              setSelectDay(date.event.startStr.substring(0, 10))
              openDailsySchduleModal()
            }}
            select={(date) => {
              setSelectDay(date.startStr)
              openDailsySchduleModal()
            }}
            navLinkDayClick={(date) => {
              setSelectDay(date.toISOString(date).substring(0, 10))
              openDailsySchduleModal()
            }}
            
            
          />
          : <FullCalendar 
                locale={"ko"}
                initialView="dayGridMonth"
                selectable="true"
                plugins={[ dayGridPlugin, interactionPlugin ]}
          />
          } 
        </div>
        <div css={s.colorLayout}>
          <div css={s.colorBox}>
            <label css={s.classLabel}>A</label>
            <div className="classA" css={s.classColor}></div>
          </div>
          <div css={s.colorBox}>
            <label css={s.classLabel}>B</label>
            <div className="classB" css={s.classColor}></div>
          </div>
          <div css={s.colorBox}>
            <label css={s.classLabel}>C</label>
            <div className="classC" css={s.classColor}></div>
          </div>
          <div css={s.colorBox}>
            <label css={s.classLabel}>D</label>
            <div className="classD" css={s.classColor}></div>
          </div>
          <div css={s.colorBox}>
            <label css={s.classLabel}>E</label>
            <div className="classE" css={s.classColor}></div>
          </div>
        </div>
        <AddClassSchedule isOpen={isOpenAddSchedule} isClose={openAddSchduleModal} viewScheduleDate={viewScheduleDate} originScheduleDate={originScheduleDate} selectTimeOption={selectTimeOption}/>
        <DailyClassSchedule isOpen={isOpenDailySchedule} isClose={openDailsySchduleModal} selectTimeOption={selectTimeOption} dailyScheduleData={dailyScheduleData}/>
      </div>
    </>
  );
}

export default ClassSchedulePage;