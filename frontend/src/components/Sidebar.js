const Sidebar = () => {
  return (
    <div className="w-[300px]">
      <div className="sidebar-container">
        <div className="avatar">A</div>
        <div className="avatar-name mt-5">Ashley Doe</div>
        <p className="avatar-title">Student</p>
        <input type="submit" value="Edit" className="primary-btn mt-3" />
        <input
          type="submit"
          value="Create Group"
          className="secondary-btn mt-2"
        />
      </div>

      <div className="sidebar-container">
        <div className="title mt-5">Friends</div>
        <div className="sidebar-container-main">
          <div className="image flex flex-row">
            <img
              src="https://picsum.photos/200/300
"
            />
            <p className="name">Ashley Doe</p>
          </div>
          <div className="image flex flex-row">
            <img
              src="https://picsum.photos/200/300
"
            />
            <p className="name">Ashley Doe</p>
          </div>
          <div className="image flex flex-row">
            <img
              src="https://picsum.photos/200/300
"
            />
            <p className="name">Ashley Doe</p>
          </div>
        </div>
      </div>

      <div className="sidebar-container">
        <div className="title mt-5">Groups</div>
        <div className="sidebar-container-main">
          <p className="name">Ashley Doe</p>
          <div className="flex flex-row mt-1">
            <div className="group-letter">A</div>
            <div className="group-letter relative left-[-9px]">D</div>
            <div className="group-letter relative left-[-20px]">C</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
