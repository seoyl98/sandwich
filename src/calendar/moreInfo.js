import {loadEvent} from "./loadEvent";

export function moreInfo(info, flag,calendar) {
    const dataInfo = document.getElementById('more_info')

    dataInfo.style.display = "flex";
    dataInfo.style.justifyContent = "space-between"
    dataInfo.style.flexDirection = "column"
    const eventName = info.event.title;
    const eventStart = info.event.start;
    const eventEnd = info.event.end;

    if (eventEnd==null) {
        dataInfo.innerHTML = `<div class='title'>${eventName}</div>
                        <div class='start-day'>${eventStart.getFullYear()}-${eventStart.getMonth()}-${eventStart.getDate()}</div>  
                        <div class="buttonList">
                            <button id="more_modify">수정</button>
                            <button id="more_cancel">취소</button>
                        </div>`
    } else {
        dataInfo.innerHTML = `<div class='title'>${eventName}</div>
                        <div class='start-day'>${eventStart.getFullYear()}-${eventStart.getMonth()}-${eventStart.getDate()}</div>  
                        <div class='end-day'>${eventEnd.getFullYear()}-${eventEnd.getMonth()}-${eventEnd.getDate()}</div>  
                        <div class="buttonList">
                            <button id="more_modify">수정</button>
                            <button id="more_cancel">취소</button>
                        </div>`
    }


    const cancel = document.getElementById('more_cancel')
    cancel.onclick = function () {
        dataInfo.style.display = "none";
    }

    const modify = document.getElementById('more_modify')
    modify.onclick = function () {
        dataInfo.style.display = "none";
        const pop = document.getElementById('modify')
        pop.style.display="flex"
        pop.style.justifyContent="space-between"
        pop.style.flexDirection="column"

        pop.innerHTML = `
            <input type="text" id="new_title">
            <input type="date" id="new_start">
            <input type="date" id="new_end">
             <div class="buttonList">
             <button id="new_check">확인</button>
             <button id="new_cancel">취소</button>
            </div>
        `
        document.getElementById('new_cancel').onclick=function (){
            pop.style.display="none";
        }
        document.getElementById('new_check').onclick=function (){
            const newTitle=document.getElementById('new_title').value;
            const newStart=document.getElementById('new_start').value;
            const newEnd=document.getElementById('new_end').value;

            console.log(newEnd)

            if(newTitle && newStart && newEnd) {
                const prevList = localStorage.getItem('event')

                let array = JSON.parse(prevList);
                array[flag].title = newTitle;
                array[flag].start = newStart;
                array[flag].end = newEnd;

                // calendar.addEvent({
                //     title: newTitle,
                //     start: newStart,
                //     end: newEnd,
                //     allDay: true
                // });

                // 일단 수정은 되는데 수정 하고 event 리스트를 재로딩 해야하는데 그 함수가 뭔지 모르겠다
                // 있을 것 같은디

                localStorage.setItem("event", JSON.stringify(array));

            }
        }
    }
}
