//*为页面创建日期（tr & td）
for (let i = 0; i < 6; i++) {
    const tbody = document.querySelector("tbody");
    const createTr = document.createElement("tr");
    tbody.appendChild(createTr);
}
const findTr = document.querySelectorAll(" tbody tr");
findTr.forEach(each => {
    for (let i = 0; i < 7; i++) {
        const createTd = document.createElement("td");
        each.appendChild(createTd);
    }
});

//*选择页面中所有的'td'元素
const values = document.querySelectorAll("td");

console.log(values);
console.log(Array.from(values));

//*object，储存返回的年、月、日期
let resArr;

const getMonthData = (year, month) => {
    //*本月第一天数据
    const firstDay = new Date(year, month - 1, 1);

    //*本月第一天是周几
    const firstDayOfWeekDay = firstDay.getDay();

    //*本月最后一天数据
    const lastDay = new Date(year, month, 0);

    //*本月最后一天是几号
    const lastDayOfMonth = lastDay.getDate();

    //*上个月最后一天的数据
    const lastDateOfLastMonth = new Date(year, month - 1, 0);

    //*上个月最后一天是几号
    const lastDayOfLastMonth = lastDateOfLastMonth.getDate();

    //*第一行显示多少个上个月的日期
    const prevMonthDayCount = firstDayOfWeekDay;

    //*修正传入的year和month的数据
    if (month == 0) {
        month = 12;
        year--;
    }
    if (month == 13) {
        month = 1;
        year++;
    }

    //*储存每个日期的数据
    let dateArr = [];

    for (let i = 0; i < 7 * 6; i++) {
        let date = i + 1 - prevMonthDayCount;
        let showDate = date;
        let thisYear = year;
        let thisMonth = month;

        if (date <= 0) {
            //*上个月数据
            showDate = lastDayOfLastMonth + date;
            thisMonth--;
        } else if (date > lastDayOfMonth) {
            //*下个月数据
            showDate = date - lastDayOfMonth;
            thisMonth++;
        }

        if (thisMonth == 0) {
            thisMonth = 12;
            thisYear--;
        }
        if (thisMonth == 13) {
            thisMonth = 1;
            thisYear++;
        }

        dateArr.push({
            year: thisYear,
            month: thisMonth,
            showDate: showDate
        });
    }

    return {
        year: year,
        month: month,
        dateArr: dateArr
    };
};

const render = (year, month) => {
    getMonthData(year, month);
    const changeYear = document.querySelector("#year");
    const changeMonth = document.querySelector("#month");
    resArr = getMonthData(year, month);

    //*每当年或月发生改变时，'head'的年、月同步更新
    changeYear.textContent = resArr.year;
    changeMonth.textContent = resArr.month;

    //*每当年或月发生改变时，日期样式重置
    values.forEach(each => {
        each.classList.remove("clicked");
        each.classList.remove("rundays");
        each.classList.remove("not-this-month");
        each.classList.remove("day-of-this-month");
    });

    // *为每个日期写入属性数据，并对所以日期进行判断加入不同样式
    for (let i = 0; i < values.length; i++) {
        values[i].textContent = resArr.dateArr[i].showDate;
        if (resArr.dateArr[i].month < 10) {
            var newMonth = "0" + resArr.dateArr[i].month;
        } else {
            newMonth = resArr.dateArr[i].month;
        }
        if (resArr.dateArr[i].showDate < 10) {
            var newDay = "0" + resArr.dateArr[i].showDate;
        } else {
            newDay = resArr.dateArr[i].showDate;
        }
        values[i].setAttribute(
            "date-val",
            resArr.dateArr[i].year + " - " + newMonth + " - " + newDay
        );

        // *基本思路：先判断年，再判断月，然后判断当前月，最后判断当前月的每个日期
        // *注意，例如当前月的'resArr.month' 为 '5'，但'reaArr.dateArr[i].month' 可能为 '4' 或 '6'
        // * '.rundays'为当前日期（即今天）之前的日期所加样式，  '.not-this-month'为当月之后的日期所加样式
        if (
            new Date(
                resArr.dateArr[i].year,
                resArr.dateArr[i].month - 1,
                resArr.dateArr[i].showDate
            ).getFullYear() < new Date().getFullYear()
        ) {
            values[i].classList.add("rundays");
        } else if (
            new Date(
                resArr.dateArr[i].year,
                resArr.dateArr[i].month - 1,
                resArr.dateArr[i].showDate
            ).getFullYear() > new Date().getFullYear()
        ) {
            values[i].classList.add("not-this-month");
        } else {
            if (
                new Date(
                    resArr.dateArr[i].year,
                    resArr.dateArr[i].month - 1,
                    resArr.dateArr[i].showDate
                ).getMonth() < new Date().getMonth()
            ) {
                values[i].classList.add("rundays");
            } else if (
                new Date(
                    resArr.dateArr[i].year,
                    resArr.dateArr[i].month - 1,
                    resArr.dateArr[i].showDate
                ).getMonth() > new Date().getMonth()
            ) {
                values[i].classList.add("not-this-month");
            } else {
                if (
                    new Date(
                        resArr.dateArr[i].year,
                        resArr.dateArr[i].month - 1,
                        resArr.dateArr[i].showDate + 1
                    ) < new Date()
                ) {
                    values[i].classList.add("rundays");
                } else {
                    values[i].classList.add("day-of-this-month");
                }
            }
        }
    }
};

// *与页面进行交互
const interaction = () => {
    // *初始化当月的日历
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    render(year, month);

    // *绑定月份加减按钮
    const prevBtn = document.querySelector(".fa-angle-left");
    const nextBtn = document.querySelector(".fa-angle-right");

    // *绑定头部'.search-box'的各部分
    const search = document.querySelector(".search-btn .fas");
    const searchBox = document.querySelector(".search-box");
    const searchDate = document.querySelector(".search-date");
    const searchBtn = document.querySelector(".search-btn");

    const all = document.querySelector(".all");
    const calendar = document.querySelector(".calendar");
    const calendarBack = document.querySelector(".calendar-back");

    // *绑定输入框
    const inputElem = document.querySelector("input");

    // *月份加减的实时更新
    prevBtn.addEventListener("click", e => {
        render(resArr.year, resArr.month - 1);
    });
    nextBtn.addEventListener("click", e => {
        render(resArr.year, resArr.month + 1);
    });

    // *鼠标点击日期时，实时在输入框更新所选日期信息
    let i = 0;
    let clickNum = [];
    values.forEach((each, num) => {
        each.addEventListener("click", function(e) {
            const data = this.getAttribute("date-val");
            inputElem.value = data;
            clickNum[i] = num;
            i++;
            if (i === 2) {
                i = 0;
            }

            if (clickNum.length === 2) {
                values[clickNum[0]].classList.remove("clicked");
                values[clickNum[1]].classList.remove("clicked");
            }
            this.classList.add("clicked");
        });
    });

    // *点击'searchBtn'时的动画绑定
    searchBtn.addEventListener("click", e => {
        searchBox.style.width = "90%";
        searchDate.style.width = "140px";
        search.classList.remove("fa-calendar-alt");
        search.classList.add("fa-search");

        all.style.transition = "height 0.7s ease";
        calendar.style.transition = "1s ease 0.7s";
        calendarBack.style.transition = "1s ease";
        all.style.height = "100%";
        calendar.style.transform = "rotateX(0deg)";
        calendarBack.style.transform = "rotateX(180deg)";
    });

    // *点击'body'内、'middle'外后的动画变动
    document.body.addEventListener("click", function(e) {
        const targetArea = e.target || e.srcElement;
        const targetClassName = targetArea.className;

        if (targetClassName.indexOf("area") == 0) {
            searchBox.style.width = "30px";
            searchDate.style.width = "0";
            search.classList.remove("fa-search");
            search.classList.add("fa-calendar-alt");
            all.style.transition = "height 0.7s ease 0.7";
            calendar.style.transition = "0.7s ease";
            calendarBack.style.transition = "1s ease 0.7";
            all.style.height = "0%";
            calendar.style.transform = "rotateX(180deg)";
            calendarBack.style.transform = "rotateX(0deg)";
        }
    });

    // *输入框搜索日期并跳转到输入日期，并且有日期格式检索
    // *输入格式如：'20190708'，按回车可跳转
    inputElem.addEventListener("keypress", function(e) {
        if (e.keyCode == 13) {
            const inputDate = this.value;
            if (inputDate.length != 8) {
                alert(
                    "\n" +
                        "Incorrect input format !" +
                        "\n" +
                        "\n" +
                        "You can input like that : 20190507"
                );
                return;
            } else {
                let newInputDate =
                    inputDate.slice(0, 4) + " - " + inputDate.slice(4);
                newInputDate =
                    newInputDate.slice(0, 9) + " - " + newInputDate.slice(9);
                console.log(newInputDate);
                let cutDate;
                cutDate = newInputDate.split(" - ");
                const cvYear = parseInt(cutDate[0]);
                const cvMonth = parseInt(cutDate[1]);
                const cvDay = parseInt(cutDate[2]);
                console.log(cvDay);
                if (cvYear >= 1970) {
                    if (cvMonth > 0 && cvMonth < 13) {
                        if (
                            new Date(cvYear, cvMonth - 1, cvDay).getMonth() ==
                            new Date(cvYear, cvMonth, 0).getMonth()
                        ) {
                            render(cvYear, cvMonth);
                            values.forEach(each => {
                                if (
                                    each.getAttribute("date-val") ==
                                    newInputDate
                                ) {
                                    each.classList.add("clicked");
                                    // inputElem.value = each.getAttribute(
                                    //     "date-val"
                                    // );
                                }
                            });
                        } else {
                            alert(
                                "\n" +
                                    "The date you entered does not exist !" +
                                    "\n" +
                                    "\n" +
                                    "Please enter anain ."
                            );
                            return;
                        }
                    } else {
                        alert(
                            "\n" +
                                "Enter the month data is incorrect !" +
                                "\n" +
                                "\n" +
                                "Recommended input range : Greater than 0 Less than 13 ."
                        );
                        return;
                    }
                } else {
                    alert(
                        "\n" +
                            "Enter the year data is incorrect !" +
                            "\n" +
                            "\n" +
                            "Recommended input range : Greater or Equal to 1970 ."
                    );
                    return;
                }
            }
        }
    });
};

interaction();
