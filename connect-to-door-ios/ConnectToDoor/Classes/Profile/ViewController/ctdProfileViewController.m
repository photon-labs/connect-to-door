//
//  ctdProfileViewController.m
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/7/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdProfileViewController.h"
#import "ctdLocalStorage.h"
#import "ctdConstants.h"

@implementation ctdProfileViewController

NSString *employeeId;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
}

// Displays the user's name and profile picture so they are aware of the Facebook
// identity they are logged in as.
- (void)populateUserDetails {
    ctdLocalStorage *localStorage = [[ctdLocalStorage alloc]init];

    employeeId = localStorage.getEmployeeId;
    self.userProfileImage.profileID = localStorage.getUserFacebookId;
    self.facebookIdLabel.text = localStorage.getUserFacebookId;
    
    ctdProfileService *profileService = [[ctdProfileService alloc] init];
    [profileService handleProfileRequest:EMPLOYEE_ID_PARAMETER :employeeId];
    profileService.delegate = self;
}

- (void)didReceiveProfileResponse:(ctdProfileModel*)profileModel
{
    self.userNameLabel.text = profileModel.userName;
    self.employeeIdLabel.text = profileModel.employeeId;
    self.employeeNameLabel.text = profileModel.employeeName;
    self.genderLabel.text = profileModel.gender;
    self.employeeEmailPhotonLabel.text = profileModel.employeeEmailPhoton;
    self.employeeStartWorkLabel.text = profileModel.employeeStartWork;
    self.signatureLabel.text = profileModel.signature;
    self.statusLabel.text = profileModel.status;
    self.authorityLabel.text = profileModel.authority;
    self.projectIdLabel.text = profileModel.projectId;
   
    self.marriedLabel.text = [NSString stringWithFormat:@"%@ days", profileModel.married];
    self.condolencesLabel.text = [NSString stringWithFormat:@"%@ days", profileModel.condolences];
    self.maternityLabel.text = [NSString stringWithFormat:@"%@ days", profileModel.maternity];
    self.cOffLabel.text = [NSString stringWithFormat:@"%@ days", profileModel.cOff];
    self.annualLabel.text = [NSString stringWithFormat:@"%@ days", profileModel.annual];
    self.onsiteLabel.text = [NSString stringWithFormat:@"%@ days", profileModel.onsite];
    self.paternityLabel.text = [NSString stringWithFormat:@"%@ days", profileModel.paternity];
    self.sickLabel.text = [NSString stringWithFormat:@"%@ days", profileModel.sick];
}

- (void)didReceiveProfileErrorResponse:(NSError*)error
{
    NSLog(@"ERROR RESPONSE : %@", error);
}

-(void)viewWillAppear:(BOOL)animated{
    [self populateUserDetails];
    [self.navigationController setNavigationBarHidden:NO animated:YES];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [FBProfilePictureView class];
    return YES;
}

@end
