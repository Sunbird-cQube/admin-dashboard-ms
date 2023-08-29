const HomePage = () => {
  return (
    <div className="flex items-center justfy-center h-full">
      <div className="bg-white min-h-[80vh] w-[80vw] m-auto rounded-lg">
        <p>Select type of data to be debugged</p>
        <div className="">
          <input type="radio" name="dimension" id="" />
          <label htmlFor="dimension">Dimension</label>
          <input type="radio" name="event" id="" />
          <label htmlFor="event">Event</label>
        </div>
        
        <div>
          <div className="">
            <label htmlFor="schema">Select Dimension/Event schema</label>
            <br></br>
            <select name="schema" id="cars">
              <option value="state">State Schema</option>
              <option value="district">District Schema</option>
              <option value="city">City Schema</option>
              <option value="block">Block Schema</option>
            </select>
          </div>
          <div className="">Upload File</div>
        </div>
        <button className="">Start Debugging</button>
      </div>
    </div>
  );
};

export default HomePage;
