import Title from '../../../../Components/Elements/Title';
import UserDetailSection from '../../../../Components/Elements/UserDetailSection';
import UserDetailSectionHeader from '../../../../Components/Elements/UserDetailSection/UserDetailSectionHeader';
import EditLocationButton from './EditLocationButton';
import LocationDetail from './LocationDetail';
import LocationNotAdded from './LocationNotAdded';

interface IProps {}
const UserDetailLocation: React.FC<IProps> = () => {
  return (
    <UserDetailSection>
      <UserDetailSectionHeader>
        <Title>Location</Title>
        <EditLocationButton />
      </UserDetailSectionHeader>
      <div className="bg-white flex-column p-4 rounded-lg">
        <div>
          <LocationNotAdded />
          <LocationDetail />
        </div>
      </div>
    </UserDetailSection>
  );
};

export default UserDetailLocation;
