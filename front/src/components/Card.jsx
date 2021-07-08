import React, { useEffect, useState } from 'react';
import { Badge, Button, Card as AntCard, Radio, Tag } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useLocation } from 'react-router';
import EditModal from './EditModal';
import { MinusCircleOutlined } from '@ant-design/icons';

// const StyledCard = styled(AntCard)`
//   min-width: 16rem;
//   max-width: 30rem;
//   position: relative;
//   box-shadow: ${(props) => props.selected && '4px 4px 15px 0px #383838'};
//   top: ${(props) => props.selected && '2px'};
// `;

const Card = ({
  card,
  fetchCards,
  selectedCards,
  setSelectedCards,
  settingsCard,
}) => {
  let location = useLocation();
  const [editCard, setEditCard] = useState({});
  const [showRibbon, setShowRibbon] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [radioText, setRadioText] = useState('');
  const { title, category, image_path } = card;

  const handleClick = () => {
    if (settingsCard) {
      console.log('card ? ', card);
      setShowRibbon((prev) => !prev);
      setSelectedCards(selectedCards.concat(card));
      console.log('selectedCards ? ', selectedCards);
    } else {
      // console.log('editCard? ', editCard);
      console.log('selectedCards ? ', selectedCards);
      setEditCard(card);
      setShowEditModal(true);
    }
  };

  const removeFromSelectedCards = () => {
    setSelectedCards(
      selectedCards.filter((selected) => selected.id !== card.id)
    );
    console.log('selectedCards ? ', selectedCards);
  };

  return showRibbon ? (
    <Badge.Ribbon text="select">
      <AntCard
        style={{
          minWidth: '14rem',
          maxWidth: '30rem',
          border: '3px solid #2db7f5',
        }}
        bordered={false}
        cover={<img alt="movement" src={image_path} />}
        hoverable
        onClick={handleClick}
      >
        <Meta title={title} description={category && <Tag>{category}</Tag>} />
      </AntCard>
    </Badge.Ribbon>
  ) : (
    <>
      <AntCard
        style={{ minWidth: '14rem', maxWidth: '30rem' }}
        cover={<img alt="movement" src={image_path} />}
        hoverable={location.pathname === '/' && true}
        onClick={handleClick}
      >
        {/* <Radio onChange={() => setRadioText('Correct')}>{radioText}</Radio> */}
        <Meta title={title} description={category && <Tag>{category}</Tag>} />
        {!settingsCard && location.pathname === '/settings' && (
          <Button type="link" danger onClick={removeFromSelectedCards}>
            <MinusCircleOutlined style={{ fontSize: '2em' }} />
          </Button>
        )}
      </AntCard>
      {location.pathname === '/' && (
        <EditModal
          fetchCards={fetchCards}
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          editCard={editCard}
          setEditCard={setEditCard}
        />
      )}
    </>
  );
};

export default Card;
