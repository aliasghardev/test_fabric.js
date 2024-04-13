'use client'


import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

const DragAndDropText = () => {
  const canvasRef = useRef(null);
  const [addText, setAddText] = useState(false);
  const [addBox, setAddBox] = useState(false);
  const [boxColor, setBoxColor] = useState('gold');
  const [object, setObject] = useState(false);
  const [circle1, setcCircle1] = useState(false);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current);

    canvas.setDimensions({ width: window.innerWidth, height: window.innerHeight });

    const addFabricText = () => {
      const text = new fabric.Text('Hello !', {
        left: 100,
        top: 200,
      });
      canvas.add(text);

      canvas.on('mouse:down', (event) => {
        const { target, e } = event;
        if (e.button === 3) {
          const activeObjects = canvas.getActiveObjects();
          if (activeObjects.length > 1) {
            handleGrouping();
          } else {
            handleUngrouping();
          }
        } else if (target) {
          target.set({
            selectable: true,
            evented: true,
          });
          canvas.bringToFront(target);
          canvas.requestRenderAll();
        }
      });

      canvas.on('mouse:move', (event) => {
        const { target, e } = event;
        if (target && target.isDragging && e.button !== 3) {
          const { movementX, movementY } = e;
          target.set({
            left: target.left + movementX,
            top: target.top + movementY,
          });
          canvas.renderAll();
        }
      });

      canvas.on('mouse:up', (event) => {
        const { target } = event;
        if (target) {
          target.set({
            selectable: true,
            evented: true,
          });
        }
      });
    };

    const addFabricBox = () => {
      const box = new fabric.Rect({
        left: 500,
        top: 150,
        width: 500,
        height: 500,
        fill: boxColor,
        selectable: false,
        evented: false,
      });
      canvas.add(box);
    };

    const addCircle1 = () => {
      const circle = new fabric.Circle({ radius: 50, fill: 'red', top: 200, left: 100 });
      const Rect = new fabric.Rect({ fill: 'green', width: 100, height: 150, top: 250, left: 150 });
      const circle1 = new fabric.Group([circle, Rect], {
        left: 70,
        top: 94,
        angle: -10,
      });

      canvas.add(circle1);
    };

    const addFabricObj = () => {
      const rect = new fabric.Rect({
        top: 200,
        left: 200,
        width: 100,
        height: 150,
        fill: 'blue',
        selectable: true,
        evented: true,
      });
      canvas.add(rect);
    };

    if (object) {
      addFabricObj();
    }
    if (circle1) {
      addCircle1();
    }

    if (addText) {
      addFabricText();
    }
    if (addBox) {
      addFabricBox();
    }

    return () => {
      canvas.dispose();
    };

  }, [addText, addBox, boxColor, object, circle1]);

  const handleColorChange = (event) => {
    setBoxColor(event.target.value);
  };

  const addNewObject = () => {
    setObject(true);
  };



  return (
    <div className='bg-green-200 h-screen w-full overflow-hidden'>
      <canvas className='absolute top-0 left-0 border border-black' ref={canvasRef} />
      <button className='absolute top-10 left-[30%] border p-2 bg-slate-300 rounded-xl active:bg-yellow-600' onClick={() => setAddText(true)}>Add Text</button>
      <button className='absolute top-10 left-[10%] border p-2 bg-slate-300 rounded-xl active:bg-yellow-600' onClick={() => setcCircle1(true)}>Add group</button>
      <button className='absolute top-10 left-[50%] border p-2 bg-slate-300 rounded-xl active:bg-yellow-600' onClick={() => setAddBox(true)}>Add Box <input type="color" className='absolute top-10 left-[70%]' value={boxColor} onChange={handleColorChange} /></button>

      <button className='absolute top-10 left-[70%] border p-2 bg-slate-300 rounded-xl active:bg-yellow-600' onClick={addNewObject}>Add Object</button>

    </div>
  );
};

export default DragAndDropText;
