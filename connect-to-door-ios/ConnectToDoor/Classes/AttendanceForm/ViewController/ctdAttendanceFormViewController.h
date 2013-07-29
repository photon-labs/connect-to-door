//
//  ctdAttendanceFormViewController.h
//  ConnectToDoor
//
//  Created by muhammad amirul on 7/26/13.
//  Copyright (c) 2013 Photon Infotech. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ctdBaseViewController.h"

@interface ctdAttendanceFormViewController : ctdBaseViewController

@property (strong, nonatomic) IBOutlet UILabel *userNameLabel;
@property (strong, nonatomic) IBOutlet UILabel *facebookIdLabel;
@property (strong, nonatomic) IBOutlet UILabel *employeeIdLabel;
@property (strong, nonatomic) IBOutlet UILabel *employeeNameLabel;
@property (strong, nonatomic) IBOutlet UILabel *genderLabel;
@property (strong, nonatomic) IBOutlet UILabel *employeeEmailPhotonLabel;
@property (strong, nonatomic) IBOutlet UILabel *employeeStartWorkLabel;
@property (strong, nonatomic) IBOutlet UILabel *signatureLabel;
@property (strong, nonatomic) IBOutlet UILabel *statusLabel;
@property (strong, nonatomic) IBOutlet UILabel *authorityLabel;
@property (strong, nonatomic) IBOutlet UILabel *projectIdLabel;
@property (strong, nonatomic) IBOutlet UILabel *marriedLabel;
@property (strong, nonatomic) IBOutlet UILabel *condolencesLabel;
@property (strong, nonatomic) IBOutlet UILabel *maternityLabel;
@property (strong, nonatomic) IBOutlet UILabel *cOffLabel;
@property (strong, nonatomic) IBOutlet UILabel *annualLabel;
@property (strong, nonatomic) IBOutlet UILabel *onsiteLabel;
@property (strong, nonatomic) IBOutlet UILabel *paternityLabel;
@property (strong, nonatomic) IBOutlet UILabel *sickLabel;

@property (strong, nonatomic) IBOutlet UIButton *createAccountButton;
@property (strong, nonatomic) IBOutlet UIButton *editAccountButton;
@property (strong, nonatomic) IBOutlet UIButton *deleteAccountButton;
@property (strong, nonatomic) IBOutlet UIButton *searchAccountButton;
@property (strong, nonatomic) IBOutlet UIButton *saveAccountButton;
@property (strong, nonatomic) IBOutlet UIButton *deleteButton;
@property (strong, nonatomic) IBOutlet UIButton *searchOptionButton;
@property (strong, nonatomic) IBOutlet UIButton *roleOptionButton;
@property (strong, nonatomic) IBOutlet UIButton *genderOptionButton;
@property (strong, nonatomic) IBOutlet UIButton *startWorkDateButton;

- (IBAction)didCreateAccountButtonClicked:(id)sender;
- (IBAction)didEditAccountButtonClicked:(id)sender;
- (IBAction)didDeleteAccountButtonClicked:(id)sender;
- (IBAction)didSearchAccountButtonClicked:(id)sender;
- (IBAction)didSaveAccountButtonClicked:(id)sender;
- (IBAction)didDeleteButtonClicked:(id)sender;
- (IBAction)didSearchOptionButtonClicked:(id)sender;
- (IBAction)didRoleOptionButtonClicked:(id)sender;
- (IBAction)didGenderOptionButtonClicked:(id)sender;
- (IBAction)didStartWorkDateButtonClicked:(id)sender;

@end
