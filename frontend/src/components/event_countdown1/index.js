import Countdown from "react-countdown";

const CompletionList = () => (
  <p className="countdown__main-item">
    <img src="/img/icons/clock.svg" alt="" style={{ marginRight: 5 }} />
    EVENT STARTED
  </p>
);

const pad = (num, size = 2) => {
  const s = "000000000" + num;
  return s.substr(s.length - size);
};

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <CompletionList />;
  } else {
    return (
      <div>
        <p className="countdown__main">
          <img src="/img/icons/clock.svg" alt="" style={{ marginRight: 5 }} />
          {days} days {pad(hours)}h {pad(minutes)}m {pad(seconds)}s
        </p>
      </div>
    );
  }
};

const EventCountDown1 = ({ date }) => {
  const d = new Date(date);
  return <Countdown date={d} renderer={renderer} />;
};

export default EventCountDown1;
