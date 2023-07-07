import React, { useState } from 'react';
import "./DifferenceFinder.css";

function DifferenceFinder() {
  const [listA, setListA] = useState('');
  const [listB, setListB] = useState('');
  const [differences, setDifferences] = useState({
    inA: [],
    inB: [],
    inBoth: [],
    combined: [],
  });

  const computeDifferences = () => {
    const arrA = listA.split('\n').map(item => item.trim());
    const arrB = listB.split('\n').map(item => item.trim());

    const uniqueInA = arrA.filter(item => !arrB.includes(item));
    const uniqueInB = arrB.filter(item => !arrA.includes(item));
    const inBoth = arrA.filter(item => arrB.includes(item));
    const combined = [...uniqueInA, ...uniqueInB];

    setDifferences({
      inA: uniqueInA,
      inB: uniqueInB,
      inBoth,
      combined,
    });
  };

  return (
  <>
      <table border="0px" cellPadding="20px" cellSpacing="0px">

        <tr><td>List A</td> <td>List B</td></tr>
        <tr><td><textarea value={listA} onChange={e => setListA(e.target.value)} rows={5} /></td><td><textarea value={listB} onChange={e => setListB(e.target.value)} rows={5} /></td></tr>
        <tr ><td colSpan="2"><button onClick={computeDifferences}>Compute</button></td></tr>
      </table>


      <table border="1px" cellPadding="20px" cellSpacing="0px">

        <tr><td>Items present only in A:</td><td>Items present only in B</td><td>Items present in both A and B</td><td>Items combining both A and B (unique)</td></tr>
        <tr><td>
        <ul>
        {differences.inA.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      </td><td>
      <ul>
        {differences.inB.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
        
        </td><td>

        <ul>
        {differences.inBoth.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
          
          </td><td>
            
          <ul>
        {differences.combined.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
            </td></tr>

      </table>
    </>  
  );
}

export default DifferenceFinder;
