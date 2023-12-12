import React from 'react';
import '../app.css'; // TODO: local elements

export function Index() {
  const [ quote, setQuote ] = React.useState('');
  const [ recordType, setRecordType ] = React.useState('');
  const [ typeList, setTypeList ] = React.useState([]);
  const [ curRecord, setCurRecord ] = React.useState(null);

  async function getQuote() {
    // let data = await fetch("https://api.quotable.io/random");
    // let {content, author} = await data.json();
    // setQuote(`${content} - ${author}`);
  }

  async function loadTypes() {
    // let data = await fetch("/api/types");
    // data = await ans.json();
    let data = [ // temp mock for offline dev
      {
        id: "french",
        language: "French",
        display: "French 1820 Records",
      },
      {
        id: "french2",
        language: "French",
        display: "1900 Obituary",
      }
    ];
    setTypeList(data);
    if (data?.length) setRecordType(data[0]?.id);
}

  async function getRecord() {
    // let ans = await fetch(`/api/record?type=${encodeURIComponent(recordType)}`);
    // ans = await ans.json();
    // if (ans.error) {
    //     window.alert("There are no records of that type available!");
    //     return;
    // }
    let ans = {
        type: 'french',
        imageURL: "images/example3.png",
        fields: [
          {
            field: "Person's Name",
            value: "James Smith",
          },
          {
            field: "Record Date",
            value: "02/04/1780",
          },
          {
            field: "Record Location",
            value: "London",
          },
          {
            field: "Mother's Name",
            value: "Elizabeth Johnson",
          },
          {
            field: "Father's Name",
            value: "John Smith",
          },
        ],
    };
    ans.addedFields = [];
    setCurRecord(ans);
  }

  function addField() {
    let upd = {...curRecord};
    upd?.addedFields?.push({
      field: 'Click to Edit',
      value: ''
    });
    setCurRecord(upd);
  }

  function updateExistingField(e, i) {
    let upd = {...curRecord};
    upd.fields[i].value = e.target.value;
    setCurRecord(upd);
    e.stopPro
  }
  
  function updateNewField(e, i) {
    let upd = {...curRecord};
    upd.addedFields[i].value = e.target.value;
    setCurRecord(upd);
  }

  function deleteField(i) {
    let upd = {...curRecord};
    upd.addedFields.splice(i, 1);
    setCurRecord(upd);
  }

  async function submitRecord() {
    let data = {...curRecord};
    getRecord();
    // data.results = data.fields
    // data.results.extend(data.addedFields);
    // TODO: submit results as expected
    console.log(data);
  //   await fetch("/api/record", {
  //     method: "PUT",
  //     headers: {
  //         "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data)
  // });
  }

  React.useEffect(() => {
    if (recordType) getRecord();
  }, [recordType]);

  React.useEffect(() => {
    async function init() {
      loadTypes();
      getQuote();
    }
    init();
  }, []);

  return (
    <main>
      <h1 className="welcome">Welcome</h1>

      { quote ? <div className="quote"> { quote } </div> : <></>}

      <div className="content">

        <div className="image-wrapper">
          {curRecord?.imageURL ? <img src={curRecord.imageURL} className="image" id="recordImage"></img> : <></>}
        </div>
        
        <div className="form-wrapper">
        
          <form action="javascript:void(0);">
            <select id="datasets" onChange={event => setRecordType(event.target.value)}>
              { typeList.map(t => <option value={t.id}>{ t.display }</option>) }
            </select><br/>
            
            <table id="indexFields">
                {
                  curRecord?.fields.map((f,i) => {
                    return (<tr>
                      <td>{f.field}</td>
                      <td><input type="text" id={f.field} value={f.value} onChange={(e) => updateExistingField(e, i)}/></td>
                      </tr>);
                  })
                }
                {/* TODO: content editable complaining */}
                {
                  curRecord?.addedFields.map((f,i) => {
                    return (<tr> 
                      <td><span onClick={() => deleteField(i)}>&#10006; </span><span className="edit" contentEditable="true" onChange={console.log}>{f.field}</span></td>
                      <td><input type="text" id={f.field} value={f.value} onChange={(e) => updateNewField(e, i)}/></td>
                      </tr>);
                  })
                }
            </table>
            
            <div className="button-row">
              <button onClick={addField}>Add field</button>
              <button type="submit" id="submit" onClick={submitRecord}>Submit</button><br/>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
