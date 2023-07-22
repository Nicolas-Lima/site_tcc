import DrawerAndNav from "../../components/DrawerAndNav";
import ScheduleIrrigation from "../../components/ScheduleIrrigation";
import Container from "../../components/Container";
import Row from "../../components/Row";

function Schedule() {
  return (
    <div>
      <DrawerAndNav />
      <Container className="mt-5 mt-sm-4 mt-md-0">
        <Row className="justify-content-center">
          <ScheduleIrrigation />
        </Row>
      </Container>
    </div>
  );
}

export default Schedule;
