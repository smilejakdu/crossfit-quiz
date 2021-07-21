import React, { useEffect, useState } from 'react';
import { Badge, Button, Tag } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useLocation } from 'react-router';
import EditModal from './EditModal';
import { categoryOptions, currentUserId } from '../constants';
import { DeselectBtn, StyledCard, TitleWrapper } from '../styles/card';
import { EditOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useRouteMatch } from 'react-router-dom';

const Card = ({
  card,
  fetchCards,
  selectedCards,
  setSelectedCards,
  settingsCard,
}) => {
  let location = useLocation();
  const [showRibbon, setShowRibbon] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [category, setCategory] = useState('');
  let matchEditSettings = useRouteMatch('/settings/:id');
  const { id, title, category_id, img_path, google_id } = card;

  useEffect(() => {
    if (category_id) setCategory(categoryOptions[category_id - 1].value);
  }, []);

  useEffect(() => {
    if (location.pathname === '/settings' || matchEditSettings) {
      const selected = selectedCards.filter((selected) => selected.id === id);
      if (settingsCard && selected.length > 0) {
        setShowRibbon(true);
      }
    }
  }, []);

  const handleClick = () => {
    if (settingsCard && !showRibbon && selectedCards.length < 4) {
      addToSelectedCards();
    } else if (settingsCard && showRibbon) {
      removeFromSelectedCards();
    } else {
      setShowEditModal(true);
    }
  };

  const addToSelectedCards = () => {
    setShowRibbon(true);
    setSelectedCards([...selectedCards, card]);
    console.log('selectedCards ? ', selectedCards);
  };

  const removeFromSelectedCards = () => {
    setShowRibbon(false);
    setSelectedCards(
      selectedCards.filter((selected) => selected.id !== card.id)
    );
    console.log('selectedCards ? ', selectedCards);
  };

  return showRibbon ? (
    <Badge.Ribbon text="select">
      <StyledCard
        style={{
          border: '3px solid #2db7f5',
        }}
        bordered={false}
        cover={<img alt="movement" src={img_path} />}
        hoverable
        onClick={handleClick}
      >
        <Meta
          title={title}
          description={category_id && <Tag>{category}</Tag>}
        />
      </StyledCard>
    </Badge.Ribbon>
  ) : (
    <>
      <StyledCard cover={<img alt="movement" src={img_path} />}>
        <Meta
          title={
            <TitleWrapper>
              {title}
              {currentUserId === google_id && (
                <Button
                  type="primary"
                  shape="round"
                  ghost
                  onClick={handleClick}
                >
                  <EditOutlined />
                  Edit
                </Button>
              )}
            </TitleWrapper>
          }
          description={[
            category_id && <Tag>{category}</Tag>,
            !settingsCard && location.pathname === '/settings' && (
              <DeselectBtn type="link" onClick={removeFromSelectedCards}>
                <MinusCircleOutlined />
              </DeselectBtn>
            ),
          ]}
        />
      </StyledCard>
      {location.pathname === '/' && (
        <EditModal
          fetchCards={fetchCards}
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          card={card}
          category={category}
        />
      )}
    </>
  );
};

export default Card;
