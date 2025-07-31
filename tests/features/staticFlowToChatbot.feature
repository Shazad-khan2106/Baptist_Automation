Feature: Validating Baptist Static Flow to Chatbot
  Background: Login to Baptist
    Given I open the baptist login page
    When I enter "username" and "password"
    Then I should see the homepage

  Scenario: Mobile View Static Flow to Chatbot
    When I see the navigation bar
    Then I click on "Get Care" option
    And I select "Schedule Appointment" option
    And I click on "Primary Care" card
    Then I can see the chatbot with tooltip
    And I click on the chatbot icon
    Then chatbot window is open 
    And I can see a toast message for emergency
    And A welcome message from chat assistant
    And speaker and back button at the top 
    And An input element with disabled mic icon
    Then I click on i button
    And A overlay gets open with a message and "Got It" button
    
    