import { useEffect, useState } from "react";
import Papa from "papaparse";

export const CSV = () => {

    let [text, setText] = useState([]);
    let [rowsArray, setRowsArray] = useState([]);
    let [valuesArray, setValuesArray] = useState([]);
    let [emptyRezults, setEmptyRezults] = useState(0);
    let [fullRezults, setFullRezults] = useState(0);
    let [selectValue, setSelectValue] = useState();

    const rowsArrayShow = rowsArray.map(elem => elem + selectValue);

    function onChangeSelect(e) {
        setSelectValue(e.target.value)
    };

    function onChange(e) {
        Papa.parse(e.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                setText(text = results.data);

                const rowsArray = [];
                const valuesArray = [];

                results.data.map(data => {
                    rowsArray.push(Object.keys(data));
                    valuesArray.push(Object.values(data));
                });
                setRowsArray(rowsArray[0]);
                setValuesArray(valuesArray);
            },
        });
    };

    function showFullValue() {
        let count = 0;
        let countEmpty = 0;
        valuesArray.map(elem => {
            if (elem.length === rowsArray.length) {
                count += 1;
            } else {
                countEmpty += 1;
            }
        });
        setFullRezults(fullRezults = count);
        setEmptyRezults(emptyRezults = countEmpty);
    };

    useEffect(() => {
        showFullValue();
    }, [rowsArray]);

    return (
        <div>
            <form>
                <input
                    onChange={e => onChange(e)}
                    type="file"
                    accept=".csv"
                />
                <label>Выберите разделитель</label>
                <select 
                    name="select" 
                    value={selectValue} 
                    onChange={onChangeSelect}
                    defaultValue={selectValue}
                >
                    <option value="/\">/\</option>
                    <option value="==">==</option>
                    <option value="!!!">!!!</option>
                </select>
            </form>

            <div>
                <div>
                    Количество столбцов в загруженном файле: {text.length}
                </div>
                <div>
                    Перечень столбцов в загруженном файле: {rowsArrayShow}
                </div>
                <div>
                    Количество строк данных с полным заполнение: {fullRezults}
                </div>
                <div>
                    Количество строк данных с неполным заполнение: {emptyRezults}
                </div>
            </div>
        </div>
    );
};