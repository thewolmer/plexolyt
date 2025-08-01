import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';

import { env } from '@/env';
import { formatCurrency, formatDate } from '@/utils/formatter';

import { OrderWithPayLoad } from '@/types/order/OrderWithProducts';

const baseUrl = process.env.VERCEL_URL ? `https://${env.NEXT_PUBLIC_APP_URL}` : '';

export const OrderConfirmationEmail = ({ order }: { order: OrderWithPayLoad }) => (
  <Tailwind
    config={{
      theme: {
        extend: {
          colors: {
            brand: '#007291',
          },
        },
      },
    }}
  >
    <Html>
      <Head />
      <Preview>Plexolyt Cables Receipt</Preview>
      <Body className="font-sans">
        <Container style={container}>
          <Section>
            <Row>
              <Column>Plexolyt Cables</Column>
              <Column align="right" style={tableCell}>
                <Text style={heading}>Receipt</Text>
              </Column>
            </Row>
          </Section>
          <Section style={informationTable}>
            <Row style={informationTableRow}>
              <Column colSpan={2}>
                <Section>
                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>EMAIL</Text>

                      {order.email}
                    </Column>
                  </Row>

                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>INVOICE DATE</Text>
                      <Text style={informationTableValue}>{formatDate(order.updatedAt)}</Text>
                    </Column>
                  </Row>

                  <Row>
                    <Column style={informationTableColumn}>
                      <Text style={informationTableLabel}>ORDER ID</Text>
                      <Text style={informationTableValue}>{order.id}</Text>
                    </Column>
                  </Row>
                </Section>
              </Column>
              <Column style={informationTableColumn} colSpan={2}>
                <Text style={informationTableLabel}>SHIPPING TO</Text>
                <Text style={informationTableValue}>{order.name}</Text>
                <Text style={informationTableValue}>{order.line1}</Text>
                <Text style={informationTableValue}>{order.line2}</Text>
                <Text style={informationTableValue}>
                  {order.city}, {order.state}, {order.postal_code}
                </Text>
                <Text style={informationTableValue}>{order.country}</Text>
              </Column>
            </Row>
          </Section>
          <Section style={productTitleTable}>
            <Text style={productsTitle}>Order Summary</Text>
          </Section>
          <Section>
            {order.orderItems.map((item) => (
              <Row key={item.id}>
                <Column style={{ width: '64px' }}>
                  <Img src={item.product.images[0].imageUrl} width="64" height="64" alt="HBO Max" style={productIcon} />
                </Column>
                <Column style={{ paddingLeft: '22px' }}>
                  <Text style={productTitle}>{item.product.name}</Text>
                  <Text style={productDescription}>
                    {item.product.category.name} <span style={divisor}>|</span> {item.product.color.name}{' '}
                    <span style={divisor}>|</span> {item.product.length.name} <span style={divisor}>|</span>{' '}
                    {item.product.width.name}
                  </Text>
                </Column>

                <Column style={productPriceWrapper} align="right">
                  <Text style={productPrice}>{formatCurrency(item.product.price)}</Text>
                  <Text style={productDescription}>{item.quantity}</Text>
                </Column>
              </Row>
            ))}
          </Section>
          <Hr style={productPriceLine} />
          <Section align="right">
            <Row>
              <Column style={tableCell} align="right">
                <Text style={productPriceTotal}>TOTAL</Text>
              </Column>
              <Column style={productPriceVerticalLine}></Column>
              <Column style={productPriceLargeWrapper}>
                <Text style={productPriceLarge}>{formatCurrency(order.amount)}</Text>
              </Column>
            </Row>
          </Section>
          <Hr style={productPriceLineBottom} />

          <Text style={footerLinksWrapper}>
            <Link href={`${baseUrl}/tos`}>Terms of Sale</Link> •{' '}
            <Link href={`${baseUrl}/privacy-policy`}>Privacy Policy </Link>•{' '}
            <Link href={`${baseUrl}/tos`}>Terms of Sale</Link> •{' '}
            <Link href={`${baseUrl}/refund-policy`}>Refund Policy </Link>
          </Text>
          <Text style={footerCopyright}>
            Copyright © Plexolyt Cables. <br /> <Link href={`${baseUrl}/`}>All rights reserved</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);
export default OrderConfirmationEmail;

const resetText = {
  margin: '0',
  padding: '0',
  lineHeight: 1.4,
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '660px',
  maxWidth: '100%',
};

const tableCell = { display: 'table-cell' };

const heading = {
  fontSize: '32px',
  fontWeight: '300',
  color: '#888888',
};

const informationTable = {
  borderCollapse: 'collapse' as const,
  borderSpacing: '0px',
  color: 'rgb(51,51,51)',
  backgroundColor: 'rgb(250,250,250)',
  borderRadius: '3px',
  fontSize: '12px',
};

const informationTableRow = {
  height: '46px',
};

const informationTableColumn = {
  paddingLeft: '20px',
  borderStyle: 'solid',
  borderColor: 'white',
  borderWidth: '0px 1px 1px 0px',
  height: '44px',
};

const informationTableLabel = {
  ...resetText,
  color: 'rgb(102,102,102)',
  fontSize: '10px',
};

const informationTableValue = {
  fontSize: '12px',
  margin: '0',
  padding: '0',
  lineHeight: 1.4,
};

const productTitleTable = {
  ...informationTable,
  margin: '30px 0 15px 0',
  height: '24px',
};

const productsTitle = {
  background: '#fafafa',
  paddingLeft: '10px',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0',
};

const productIcon = {
  margin: '0 0 0 20px',
  borderRadius: '14px',
  border: '1px solid rgba(128,128,128,0.2)',
};

const productTitle = { fontSize: '12px', fontWeight: '600', ...resetText };

const productDescription = {
  fontSize: '12px',
  color: 'rgb(102,102,102)',
  ...resetText,
};

const divisor = {
  marginLeft: '4px',
  marginRight: '4px',
  color: 'rgb(51,51,51)',
  fontWeight: 200,
};

const productPriceTotal = {
  margin: '0',
  color: 'rgb(102,102,102)',
  fontSize: '10px',
  fontWeight: '600',
  padding: '0px 30px 0px 0px',
  textAlign: 'right' as const,
};

const productPrice = {
  fontSize: '12px',
  fontWeight: '600',
  margin: '0',
};

const productPriceLarge = {
  margin: '0px 20px 0px 0px',
  fontSize: '16px',
  fontWeight: '600',
  whiteSpace: 'nowrap' as const,
  textAlign: 'right' as const,
};

const productPriceWrapper = {
  display: 'table-cell',
  padding: '0px 20px 0px 0px',
  width: '100px',
  verticalAlign: 'top',
};

const productPriceLine = { margin: '30px 0 0 0' };

const productPriceVerticalLine = {
  height: '48px',
  borderLeft: '1px solid',
  borderColor: 'rgb(238,238,238)',
};

const productPriceLargeWrapper = { display: 'table-cell', width: '90px' };

const productPriceLineBottom = { margin: '0 0 75px 0' };

const footerLinksWrapper = {
  margin: '8px 0 0 0',
  textAlign: 'center' as const,
  fontSize: '12px',
  color: 'rgb(102,102,102)',
};

const footerCopyright = {
  margin: '25px 0 0 0',
  textAlign: 'center' as const,
  fontSize: '12px',
  color: 'rgb(102,102,102)',
};
