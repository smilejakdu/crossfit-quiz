import React, { useEffect, useState } from 'react';
import { Badge, Tag } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useLocation } from 'react-router';
import EditModal from './EditModal';
import { categoryOptions } from '../constants';
import {
  Cover,
  DeselectBtn,
  EditButton,
  StyledCard,
  TitleWrapper,
} from '../styles/card';
import { EditOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useRouteMatch } from 'react-router-dom';
import { baseURL } from '../service/config';

const Card = ({
  card,
  fetchCards,
  selectedCards,
  setSelectedCards,
  settingsCard,
  userObj,
}) => {
  let location = useLocation();
  const [showRibbon, setShowRibbon] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [category, setCategory] = useState('');
  const [categoryColor, setCategoryColor] = useState('');
  let matchEditSettings = useRouteMatch('/settings/:id');
  const { id, title, category_id, img_path, users_id } = card;

  useEffect(() => {
    setCategory(categoryOptions[category_id - 1].value);
    setCategoryColor(categoryOptions[category_id - 1].color);
  }, [card]);

  useEffect(() => {
    if (location.pathname === '/settings' || matchEditSettings) {
      const selected = selectedCards.filter((selected) => selected.id === id);
      if (settingsCard && selected.length > 0) {
        setShowRibbon(true);
      }
    }
  }, []);

  const handleClick = () => {
    if (settingsCard && !showRibbon && selectedCards.length < 2) {
      addToSelectedCards();
    } else if (settingsCard && showRibbon) {
      removeFromSelectedCards();
    }
  };

  const addToSelectedCards = () => {
    setShowRibbon(true);
    setSelectedCards([...selectedCards, card]);
  };

  const removeFromSelectedCards = () => {
    setShowRibbon(false);
    setSelectedCards(
      selectedCards.filter((selected) => selected.id !== card.id)
    );
  };

  return showRibbon ? (
    <Badge.Ribbon text="select">
      <StyledCard
        style={{
          border: '3px solid #2db7f5',
        }}
        bordered={false}
        cover={<Cover alt="movement" src={`${baseURL}/${img_path}`} />}
        hoverable
        onClick={handleClick}
      >
        <Meta
          title={title}
          description={
            category_id && <Tag color={categoryColor}>{category}</Tag>
          }
        />
      </StyledCard>
    </Badge.Ribbon>
  ) : (
    <>
      <StyledCard
        cover={<Cover alt="movement" src={`${baseURL}/${img_path}`} />}
        onClick={handleClick}
      >
        {userObj && userObj.id === users_id && (
          <EditButton
            type="primary"
            shape="round"
            onClick={() => setShowEditModal(true)}
          >
            <EditOutlined />
            Edit
          </EditButton>
        )}
        <Meta
          title={<TitleWrapper>{title}</TitleWrapper>}
          description={[
            category_id && <Tag color={categoryColor}>{category}</Tag>,
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
